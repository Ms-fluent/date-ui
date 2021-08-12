import {MsCalendar} from './calendar';
import {Directive, HostListener} from '@angular/core';

@Directive({
  selector: '[ms-calendar-next], [MsCalendarNext]'
})
export class MsCalendarNext {
  constructor(private calendar: MsCalendar) {
    if (!calendar) {
      throw new Error('The MsCalendarNext must be inside a MsCalendar.')
    }
  }

  @HostListener('click')
  next() {
    this.calendar.nextMonth().then();
  }
}


@Directive({
  selector: '[ms-calendar-prev], [MsCalendarPrev]'
})
export class MsCalendarPrev {
  constructor(private calendar: MsCalendar) {
    if (!calendar) {
      throw new Error('The MsCalendarPrev must be inside a MsCalendar.')
    }
  }

  @HostListener('click')
  next() {
    this.calendar.prevMonth().then();
  }
}

@Directive({
  selector: '[ms-calendar-current], [MsCalendarCurrent]'
})
export class MsCalendarCurrent {
  constructor(private calendar: MsCalendar) {
    if (!calendar) {
      throw new Error('The MsCalendarCurrent must be inside a MsCalendar.')
    }
  }

  @HostListener('click')
  next() {
    this.calendar.currentMonth().then();
  }
}
