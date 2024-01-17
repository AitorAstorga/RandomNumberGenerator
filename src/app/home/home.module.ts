import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { HomePage } from './home.page';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HomePageRoutingModule } from './home-routing.module';
import { LoadingCircleComponent } from '../loading-circle/loading-circle.component';

import {  HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    })
  ],
  declarations: [HomePage, LoadingCircleComponent]
})
export class HomePageModule {
  ngOnInit(): void {
    console.log('HomeModule initialized');
  }
}
