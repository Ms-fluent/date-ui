import {Directive, TemplateRef} from '@angular/core';

export class MsCalendarHeaderTemplateContext {
  constructor(public $implicit: Date) {}
}

@Directive({
  selector: '[ms-calendar-header-def], [MsCalendarHeaderTemplate]'
})
export class MsCalendarHeaderTemplate {
  constructor(public template: TemplateRef<MsCalendarHeaderTemplateContext>) {
  }
}


export class MsCalendarDayTemplateContext {
  constructor(public $implicit: Date, public index: number, public extra: boolean) {
  }
}

@Directive({
  selector: '[ms-calendar-day-def], [MsCalendarDayTemplate]'
})
export class MsCalendarDayTemplate {
  constructor(public template: TemplateRef<MsCalendarDayTemplateContext>) {
  }
}
