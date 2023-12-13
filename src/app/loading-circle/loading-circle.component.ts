import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription, interval, takeWhile } from 'rxjs';

@Component({
  selector: 'app-loading-circle',
  templateUrl: './loading-circle.component.html',
  styleUrls: ['./loading-circle.component.scss'],
})
export class LoadingCircleComponent implements OnInit, OnDestroy {
  @Input() lastNumber: number = 0;
  @Input() interval: number = 1000;
  loadingProgress: number = 0;
  private intervalSubscription!: Subscription;

  ngOnInit() {
    this.startLoading();
  }

  ngOnDestroy() {
    this.intervalSubscription.unsubscribe();
  }

  startLoading() {
    this.intervalSubscription = interval(this.interval / 100)
      .pipe(takeWhile(() => this.loadingProgress < 100))
      .subscribe(() => {
        this.loadingProgress++;
        if (this.loadingProgress === 100) {
          this.loadingProgress = 0;
        }
      });
  }

  resetLoading() {
    this.loadingProgress = 0;
    this.startLoading();
  }
  
}
