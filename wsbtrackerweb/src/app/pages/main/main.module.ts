import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {
  NbButtonModule,
  NbCardModule,
  NbIconModule,
  NbLayoutModule,
  NbListModule,
  NbProgressBarModule,
  NbSelectModule,
  NbTabsetModule,
  NbThemeModule,
  NbUserModule,
} from '@nebular/theme';
import { MentionedStocksComponent } from 'src/app/components/mentioned-stocks/mentioned-stocks.component';
import { MainComponent } from './main.component';

@NgModule({
  declarations: [MainComponent, MentionedStocksComponent],
  imports: [
    MentionedStocksComponent,
    BrowserModule,
    NbThemeModule.forRoot({ name: 'cosmic' }),
    NbLayoutModule,
    NbListModule,
    NbCardModule,
    NbUserModule,
    NbButtonModule,
    NbIconModule,
    NbTabsetModule,
    NbSelectModule,
    NbListModule,
    NbProgressBarModule,
  ],
  exports: [MainComponent, MentionedStocksComponent],
})
export class MainModule {}
