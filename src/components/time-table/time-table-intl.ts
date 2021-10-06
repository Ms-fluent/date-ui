import {Subject} from 'rxjs';
import {FR_DAYS_OF_WEEKS, FR_SHORT_DAYS_OF_WEEK} from '../core';

export interface MsTimeTableIntl {
  /**
   * Stream that emits whenever the labels here are changed. Use this to notify
   * components if the labels have changed after initialization.
   */
  readonly changes: Subject<void>;

  daysOfWeek: string[];

  shortDaysOfWeek: string[];

  timeFormat: string;

}


export class MsTimeTableIntlFr implements MsTimeTableIntl {

  readonly changes: Subject<void> = new Subject<void>();

  daysOfWeek = FR_DAYS_OF_WEEKS;

  shortDaysOfWeek = FR_SHORT_DAYS_OF_WEEK;

  timeFormat: string = 'hh:mm';
}
