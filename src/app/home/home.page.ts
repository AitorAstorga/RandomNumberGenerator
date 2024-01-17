import { Component, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject, EMPTY, Observable, interval } from 'rxjs';
import { map, startWith, switchMap } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { IonSelect } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  randomNumber$: Observable<number> | undefined;
  lastNumber: number = 0; // This will hold the last generated number
  lastNumbers: number[] = [];
  min = 0;
  max = 100;
  interv = 1000; // default 1 second
  interval$ = new BehaviorSubject<number>(this.interv);
  isPaused = false;
  startText = '';
  stopText = '';

  @ViewChild('languageSelect') languageSelect!: IonSelect 

  appLanguageList = [
    { text: 'English', code: 'en' },
    { text: 'Español', code: 'es' },
    { text: 'Euskara', code: 'eu' }
  ];

  selectedLanguage = 'en';

  constructor(private translateService: TranslateService) {}

  ngOnInit(): void {
    console.log('HomePage initialized');

    this.translateService.use(this.selectedLanguage).subscribe(() => {
      this.translateService.get(['home.start', 'home.stop']).subscribe((texts) => {
        this.startText = texts['home.start'];
        this.stopText = texts['home.stop'];
      });
    });

    this.randomNumber$ = this.interval$.pipe(
      switchMap(interv => interv ? interval(interv).pipe(
        startWith(this.generateRandomNumber(this.min, this.max)), // Emit a number immediately
        map(() => {
          const num = this.generateRandomNumber(this.min, this.max);
          this.lastNumber = num; // Update the last number
          if (this.lastNumbers.length >= 5) {
            this.lastNumbers.pop();
          }
          this.lastNumbers.unshift(num);
          return num;
        })
      ) : EMPTY), // Use EMPTY if there is no interval set
    );
  }

  generateRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  updateInterval(interval: number): void {
    this.interv = +interval; // Use unary plus to convert string to number
    this.interval$.next(this.interv);
  }

  togglePausePlay(): void {
    this.isPaused = !this.isPaused;
    if (this.isPaused) {
      this.interval$.next(0); // Stop emitting numbers
    } else {
      this.interval$.next(this.interv); // Resume emitting numbers
    }
  }

  changeLanguage() {
    this.translateService.use(this.selectedLanguage).subscribe(() => {
      this.translateService.get(['home.start', 'home.stop']).subscribe((texts) => {
        this.startText = texts['home.start'];
        this.stopText = texts['home.stop'];
      });
    });
  }

  compareWithLanguage(o1: string, o2: string): boolean {
    return o1 === o2;
  }

  openLanguageSelect() {
    this.languageSelect.open();
  }
}
