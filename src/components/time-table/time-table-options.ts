import {InjectionToken} from '@angular/core';
import {MsTimeTableIntl, MsTimeTableIntlFr} from './time-table-intl';
import {MsTimeTableItem} from './time-table-item';

export type MsTimeTableColumnWidth = string | 'auto';

export class MsTimeTableDefaultOptions {
  intlProvider: MsTimeTableIntl;
  columnWidth: MsTimeTableColumnWidth;
  rowHeight: number;
  compareFn: (t1: MsTimeTableItem, t2: MsTimeTableItem) => boolean;
  dayFormat: 'short' | 'normal';
  timeFormat: string ;
}

export function MS_TIME_TABLE_DEFAULT_OPTIONS_FACTORY(): MsTimeTableDefaultOptions {
  return {
    intlProvider: new MsTimeTableIntlFr(),
    rowHeight: 64,
    columnWidth: 'auto',
    compareFn: (t1, t2) => t1 === t2,
    dayFormat: 'normal',
    timeFormat: 'HHh:mm'
  }
}

export const MS_TIME_TABLE_DEFAULT_OPTIONS = new InjectionToken<MsTimeTableDefaultOptions>('ms-time-table-options', {
  providedIn: 'root',
  factory: MS_TIME_TABLE_DEFAULT_OPTIONS_FACTORY
});
