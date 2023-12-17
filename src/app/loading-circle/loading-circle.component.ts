import { Component, Input, OnDestroy, OnInit, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-loading-circle',
  templateUrl: './loading-circle.component.html',
  styleUrls: ['./loading-circle.component.scss'],
})
export class LoadingCircleComponent implements OnInit, OnDestroy, OnChanges {
  @Input() interval: number = 1000;
  @Input() lastNumber: number = 0;
  @Input() isPaused: boolean = false;
  loadingProgress: number = 0;
  circumference: number = 2 * Math.PI * 15.9155;
  dashLength: number = 0;
  private intervalID: any;

  ngOnInit() {
    this.startInterval();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['interval']) {
      this.startInterval();
      this.resetLoading();
    }
  }

  ngOnDestroy() {
    this.clearInterval();
  }

  startInterval() {
    this.clearInterval();
    
    this.intervalID = setInterval(() => {
      if (!this.isPaused) {
        this.loadingProgress++;
        this.dashLength = this.loadingProgress * this.circumference / 100;
        if (this.loadingProgress >= 100) {
          this.loadingProgress = 0;
        }
      }
    }, this.calculateUpdateInterval());
  }

  calculateUpdateInterval() {
    return this.interval / 100;
  }

  resetLoading() {
    this.loadingProgress = 0;
    this.startInterval();
  }

  private clearInterval() {
    if (this.intervalID) {
      clearInterval(this.intervalID);
      this.intervalID = null;
    }
  }
}
