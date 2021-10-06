import {Component} from '@angular/core';
import {MsTimeTableItem} from '../../components/time-table/public-api';
import {LocalTime} from '@js-joda/core';

class Course implements MsTimeTableItem {
  startHour: LocalTime;
  endHour: LocalTime;
  dayOfWeek: number;
  name: string;
}

@Component({
  templateUrl: 'time-table.component.html'
})
export class TimeTableComponent {
  items: Course[] = [
    {
      startHour: LocalTime.parse('08:00'),
      endHour: LocalTime.parse('10:00'),
      dayOfWeek: 1,
      name: 'Géographie'
    },
    {
      startHour: LocalTime.parse('10:00'),
      endHour: LocalTime.parse('12:00'),
      dayOfWeek: 1,
      name: 'Histoire'
    },
    {
      startHour: LocalTime.parse('09:00'),
      endHour: LocalTime.parse('11:00'),
      dayOfWeek: 3,
      name: 'Mathématiques'
    },
    {
      startHour: LocalTime.parse('11:00'),
      endHour: LocalTime.parse('13:00'),
      dayOfWeek: 4,
      name: 'Géographie'
    },
    {
      startHour: LocalTime.parse('09:00'),
      endHour: LocalTime.parse('11:00'),
      dayOfWeek: 5,
      name: 'Français'
    },

    {
      startHour: LocalTime.parse('13:00'),
      endHour: LocalTime.parse('14:00'),
      dayOfWeek: 5,
      name: 'Latin'
    },
  ]
}
