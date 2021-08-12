import * as moment from 'moment';
import {Moment} from 'moment';

export class MonthRange {
  private _range: Moment[] = [];
  private _prevRange: Moment[] = [];
  private _nextRange: Moment[] = [];

  get range(): Moment[] {
    return this._range.slice();
  }

  get prevRange(): Moment[] {
    return this._prevRange.slice();
  }

  get nextRange(): Moment[] {
    return this._nextRange.slice();
  }

  get first(): Moment {
    return moment([this._year, this._month, 1]);
  }

  get last(): Moment {
    return this.range[this.range.length - 1];
  }

  get month(): number {
    return this._month;
  }

  get year(): number {
    return this._year;
  }

  constructor(private _year?: number, private _month?: number,) {
    if (_year === undefined || _year < 0) {
      this._year = new Date().getFullYear();
    }

    if (_month === undefined || _month < 0 && _month > 11) {
      this._month = new Date().getMonth();
    }

    this.setRange();
    this.setPrevRange();
    this.setNextRange();
    this.completeRange();
  }

  public static fromDate(date: Date): MonthRange {
    return new MonthRange(date.getFullYear(), date.getMonth());
  }

  nextMonth(): MonthRange {
    if (this.month === 11) {
      return new MonthRange(this.year + 1, 0);
    }
    return new MonthRange(this.year, this.month + 1);
  }

  prevMonth(): MonthRange {
    if (this.month === 0) {
      return new MonthRange(this.year - 1, 11);
    }
    return new MonthRange(this.year, this.month - 1);
  }

  private setRange() {
    let currentDate = this.first;
    this._range = [];

    for (let i = 0; i < 32; i++) {
      if (currentDate.month() === this.month) {
        this._range.push(currentDate);
        currentDate = currentDate.clone().add(1, 'days');
      }
    }
  }

  private setPrevRange() {
    let start = this.first.weekday();
    let currentDate = this.first;
    while (start > 0) {
      currentDate = currentDate.clone().subtract(1, 'days');
      this._prevRange.unshift(currentDate);
      start -= 1;
    }

    // console.log(this._prevRange.map(f => f.toDate()))
  }

  private setNextRange() {
    let start = this.last.weekday();
    let currentDate = this.last;
    while (start < 6) {
      currentDate = currentDate.clone().add(1, 'days');
      this._nextRange.push(currentDate);
      start += 1;
    }
  }

  private completeRange() {
    const length = this.range.length + this.prevRange.length + this.nextRange.length;

    if (length < 42) {
      let currentDate = this._nextRange[this._nextRange.length - 1] || this.last;
      let start = 0;
      while (start < 42 - length) {
        currentDate = currentDate.clone().add(1, 'days');
        this._nextRange.push(currentDate);
        start += 1;
      }
    }
  }

  getWeeksRanges(): Array<Moment[]> {
    const weeks: Array<Moment[]> = [];
    const dates = [...this._prevRange, ...this._range, ...this._nextRange];

    let i = 0;

    while (i < dates.length) {
      weeks.push(dates.slice(i, i + 7));
      i += 7;
    }

    return weeks;
  }
}


export function normalizeDayOfWeeks(day: number) {
  if (day === 0) {
    return 6;
  }
  if (day === 6) {
    return 0;
  }

  return day - 1;
}
