import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MsCalendar} from './calendar';
import {MsCalendarCurrent, MsCalendarNext, MsCalendarPrev} from './calendar-directives';
import {MsCalendarDayTemplate, MsCalendarHeaderTemplate} from './calendar-template-directives';

@NgModule({
  imports: [CommonModule],
  declarations: [MsCalendar, MsCalendarCurrent, MsCalendarNext, MsCalendarPrev,
    MsCalendarHeaderTemplate, MsCalendarDayTemplate],

  exports: [MsCalendar, MsCalendarCurrent, MsCalendarNext, MsCalendarPrev,
    MsCalendarHeaderTemplate, MsCalendarDayTemplate]
})
export class CalendarModule {
}
