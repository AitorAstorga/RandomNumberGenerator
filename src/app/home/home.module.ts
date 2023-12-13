import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { HomePage } from './home.page';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HomePageRoutingModule } from './home-routing.module';
import { LoadingCircleComponent } from '../loading-circle/loading-circle.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule
  ],
  declarations: [HomePage, LoadingCircleComponent]
})
export class HomePageModule {
  ngOnInit(): void {
    console.log('HomeModule initialized');
  }
}
