import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MsDatePicker} from './date-picker';
import {MsDatePickerHeaderTemplate} from './date-picker-header';
import {MsDatePickerDayTemplate} from './date-picker-day';

@NgModule({
  imports: [CommonModule],
  declarations: [MsDatePicker, MsDatePickerHeaderTemplate, MsDatePickerDayTemplate],
  exports: [MsDatePicker, MsDatePickerHeaderTemplate, MsDatePickerDayTemplate]
})
export class MsDatePickerModule {
}
