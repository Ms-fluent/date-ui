import {Component} from '@angular/core';
import {MsTimeTableItem} from "../../components/time-table";

@Component({
  templateUrl: 'time-table.component.html'
})
export class TimeTableComponent {
  items: MsTimeTableItem[] = [
    {
      startHour: '08:00',
      endHour: '10:00',
      dayOfWeek: 1
    },
    {
      startHour: '09:00',
      endHour: '11:00',
      dayOfWeek: 3
    },
    {
      startHour: '11:00',
      endHour: '13:00',
      dayOfWeek: 4
    },
    {
      startHour: '09:00',
      endHour: '11:00',
      dayOfWeek: 5
    },
  ]
}
