import {MsTimeTableItem} from './time-table/public-api';

export const UNIQUE_HOURS = ['08:00', '09:00', '10:00', '11:00', '13:00'];
export const TIME_TABLE_DATA: Array<any & MsTimeTableItem> = [
  {
    id: 0,
    startHour: '08:00',
    endHour: '10:00',
    dayOfWeek: 1
  },
  {
    id: 1,
    startHour: '09:00',
    endHour: '11:00',
    dayOfWeek: 3
  },
  {
    id: 2,
    startHour: '11:00',
    endHour: '13:00',
    dayOfWeek: 4
  },
  {
    id: 3,
    startHour: '09:00',
    endHour: '11:00',
    dayOfWeek: 5
  },
];
