import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, EMPTY, Observable, interval } from 'rxjs';
import { map, startWith, switchMap } from 'rxjs/operators';

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

  ngOnInit(): void {
    console.log('HomePage initialized');

    this.randomNumber$ = this.interval$.pipe(
      switchMap(interv => interv ? interval(interv).pipe(
        map(() => {
          const num = this.generateRandomNumber(this.min, this.max);
          this.lastNumber = num; // Update the last number
          if (this.lastNumbers.length >= 5) {
            this.lastNumbers.shift();
          }
          this.lastNumbers.push(num);
          return num;
        })
      ) : EMPTY), // Use EMPTY instead of []
      startWith(0) // Emit 0 initially
    );
  }

  generateRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  updateRange(min: number, max: number): void {
    this.min = +min; // Use unary plus to convert string to number
    this.max = +max; // Use unary plus to convert string to number
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
}
