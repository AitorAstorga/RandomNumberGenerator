import { Component, Input, OnDestroy, OnInit, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-loading-circle',
  templateUrl: './loading-circle.component.html',
  styleUrls: ['./loading-circle.component.scss'],
})
export class LoadingCircleComponent implements OnInit, OnDestroy, OnChanges {
  @Input() interval: number = 1000;
  @Input() lastNumber: number = 0;
  loadingProgress: number = 0;
  circumference: number = 2 * Math.PI * 15.9155;
  dashLength: number = 0;
  private intervalID: any;

  ngOnInit() {
    this.startInterval();
  }

  ngOnChanges(changes: SimpleChanges) {
    // If the interval input has changed, we need to restart the loading
    if (changes['interval']) {
      this.startInterval();
    }
  }

  ngOnDestroy() {
    clearInterval(this.intervalID);
  }

  startInterval() {
    // Clear any existing intervals to prevent duplicates
    if (this.intervalID) {
      clearInterval(this.intervalID);
    }
    
    this.intervalID = setInterval(() => {
      this.loadingProgress++;
      console.log('Loading progress: ' + this.loadingProgress + 'dashLength: ' + this.dashLength + 'circumference: ' + this.circumference + 'interval: ' + this.interval + 'intervalID: ' + this.intervalID + 'lastNumber: ' + this.lastNumber + 'loadingProgress: ' + this.loadingProgress + '');
      this.dashLength = this.loadingProgress * this.circumference / 100;
      if (this.loadingProgress >= 100) {
        this.loadingProgress = 0;
      }
    }, this.calculateUpdateInterval());
  }

  calculateUpdateInterval() {
    return this.interval / 100;
  }

  resetLoading() {
    clearInterval(this.intervalID);
    this.loadingProgress = 0;
    this.startInterval();
  }
}
