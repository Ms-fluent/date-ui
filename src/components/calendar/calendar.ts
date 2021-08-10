import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component, ElementRef,
  Inject,
  Input,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {MS_DATE_DEFAULT_OPTIONS, MsDateDefaultOptions} from '../date-options';
import {MonthRange} from '../month';

@Component({
  templateUrl: 'calendar.html',
  selector: 'MsCalendar, ms-calendar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  exportAs: 'msCalendar',
  host: {
    class: 'ms-calendar'
  }
})
export class MsCalendar {
  @Input()
  get date(): Date {
    return this._date;
  }

  set date(value: Date) {
    this._date = value;
  }

  private _date: Date = new Date();

  formatMonth(): string {
    return this.monthRange.first.format('MMMM');
  }

  formatYear(): string {
    return this.monthRange.first.format('YYYY');
  }

  get daysOfWeeks(): string[] {
    return this.options.intl.dayOfWeeks;
  }

  @ViewChild('bodyElement')
  bodyElement: ElementRef<HTMLElement>;

  get bodyHost(): HTMLElement {
    return this.bodyElement.nativeElement;
  }

  private _monthRange: MonthRange;
  get monthRange(): MonthRange {
    return this._monthRange;
  }


  constructor(private changeDetector: ChangeDetectorRef,
              @Inject(MS_DATE_DEFAULT_OPTIONS) private options: MsDateDefaultOptions) {
    this._monthRange = new MonthRange();
  }
}
