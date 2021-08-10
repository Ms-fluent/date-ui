import {Directive, TemplateRef} from '@angular/core';

export class MsDatePickerDayTemplateContext {
  constructor(public $implicit: Date, public index: number, public extra: boolean) {}
}
@Directive({
  selector: '[ms-date-picker-day-def], [MsDatePickerDayTemplate]'
})
export class MsDatePickerDayTemplate {
  constructor(public template: TemplateRef<MsDatePickerDayTemplateContext>) {}
}
