import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MsCalendar} from './calendar';

@NgModule({
  imports: [ CommonModule ],
  declarations: [ MsCalendar ],
  exports: [ MsCalendar ]
})
export class CalendarModule { }
