import {Component, ViewChild} from '@angular/core';
import {MsDatePicker} from '../../components/date-picker';

@Component({
  templateUrl: 'date-picker.component.html'
})
export class DatePickerComponent {
  inputDateValue: string;
  inputMonth: string;
  inputYear: string;

  date: Date = new Date();

  @ViewChild(MsDatePicker)
  picker: MsDatePicker;

  changeDate() {
    this.date = new Date(this.inputDateValue) || new Date();
  }

  changeMonth() {
    this.picker.month = +this.inputMonth - 1;
  }

  changeYear() {
    this.picker.year = +this.inputYear;
  }
}
