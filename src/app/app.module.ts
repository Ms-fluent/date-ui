import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {MsTimeTableModule} from '../components/time-table';
import {DatePickerComponent} from './date-picker/date-picker.component';
import {MsDatePickerModule} from '../components/date-picker';

import * as moment from 'moment';
import {CalendarComponent} from './calendar/calendar.component';
import {CalendarModule} from '../components/calendar';
import {TimeTableComponent} from './time-table/time-table.component';
import {TimeLineComponent} from './time-line/time-line.component';
import {MsTimeLineModule} from '../components/time-line';
import {FormsModule} from '@angular/forms';

moment.locale('fr');

@NgModule({
  declarations: [
    AppComponent, DatePickerComponent, CalendarComponent, TimeTableComponent, TimeLineComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MsTimeTableModule,
    MsDatePickerModule,
    CalendarModule,
    MsTimeLineModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
