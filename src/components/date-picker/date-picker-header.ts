import {Directive, TemplateRef} from '@angular/core';

export class MsDatePickerHeaderTemplateContext {
  constructor(public $implicit: Date) {}
}
@Directive({
  selector: '[ms-date-picker-header-def], [MsDatePickerHeaderTemplate]'
})
export class MsDatePickerHeaderTemplate {
  constructor(public template: TemplateRef<MsDatePickerHeaderTemplateContext>) {}
}
