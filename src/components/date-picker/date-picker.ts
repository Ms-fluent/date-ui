import {
  AfterContentInit,
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ElementRef, EventEmitter,
  forwardRef,
  Inject,
  Input, Output,
  ViewChild,
  ViewContainerRef,
  ViewEncapsulation
} from '@angular/core';
import * as moment from 'moment';
import * as gsap from 'gsap';
import {MonthRange} from '../month';
import {MS_DATE_DEFAULT_OPTIONS, MsDateDefaultOptions} from '../date-options';
import {MsDatePickerHeaderTemplate, MsDatePickerHeaderTemplateContext} from './date-picker-header';
import {MsDatePickerDayTemplate, MsDatePickerDayTemplateContext} from './date-picker-day';
import {Observable} from 'rxjs';


/** Change event object emitted by MsDatePicker. */
export class MsDatePickerChange {
  /**
   * The constructor.
   * @param source he MsDatePicker that emits the change event.
   * @param value The value of the MsDatePicker.
   */
  constructor(public source: MsDatePicker, public value: Date) {
  }
}

@Component({
  templateUrl: 'date-picker.html',
  selector: 'MsDatePicker, ms-date-picker',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'class': 'ms-date-picker'
  }
})
export class MsDatePicker implements AfterViewInit, AfterContentInit {

  @ViewChild('bodyElement')
  bodyElement: ElementRef<HTMLElement>;

  @ViewChild('headerContainer', {read: ViewContainerRef})
  headerContainer: ViewContainerRef;

  @ViewChild('dayContainer', {read: ViewContainerRef})
  dayContainer: ViewContainerRef;

  @ViewChild(forwardRef(() => MsDatePickerHeaderTemplate))
  viewTemplateHeader: MsDatePickerHeaderTemplate;

  @ContentChild(forwardRef(() => MsDatePickerHeaderTemplate))
  contentTemplateHeader: MsDatePickerHeaderTemplate;

  @ViewChild(forwardRef(() => MsDatePickerDayTemplate))
  viewTemplateDay: MsDatePickerDayTemplate;

  @ContentChild(forwardRef(() => MsDatePickerDayTemplate))
  contentTemplateDay: MsDatePickerDayTemplate;

  get headerTemplate(): MsDatePickerHeaderTemplate {
    return this.contentTemplateHeader || this.viewTemplateHeader;
  }

  get dayTemplate(): MsDatePickerDayTemplate {
    return this.contentTemplateDay || this.viewTemplateDay;
  }

  get bodyHost(): HTMLElement {
    return this.bodyElement.nativeElement;
  }

  private _monthRange: MonthRange;
  get monthRange(): MonthRange {
    return this._monthRange;
  }

  @Input()
  get date(): Date {
    return this._date;
  }

  set date(value: Date) {
    if (!value) {
      value = new Date();
    }
    if (this._isInitialized) {
      this.setDate(value).then();
    } else {
      this._date = value;
    }
  }

  private _date: Date;

  @Input()
  get month(): number {
    return this._monthRange.month;
  }

  set month(value: number) {
    if (value === undefined || value < 0 || value > 11) {
      value = 0;
    }

    if (this._isInitialized) {
      this.setMonthYear(this.year, value).then();
    } else {
      this._initialMonth = value;
    }
  }

  private _initialMonth: number = new Date().getMonth();


  @Input()
  set year(value: number) {
    if (value === undefined || value < 0) {
      value = 0;
    }

    if (this._isInitialized) {
      this.setMonthYear(value, this.month).then();
    } else {
      this._initialYear = value;
    }
  }

  get year(): number {
    return this._monthRange.year;
  }

  private _initialYear: number = new Date().getFullYear();

  @Output()
  get change(): Observable<MsDatePickerChange> {
    return this._change.asObservable();
  }

  private _change = new EventEmitter<MsDatePickerChange>();

  formatDate(): string {
    return moment(this.date).format('dddd DD MMMM');
  }

  formatMonth(): string {
    return this.monthRange ? moment.months()[this.month] + ' ' + this.year : '';
  }

  get daysOfWeeks(): string[] {
    return this.options.intl.shortDaysOfWeeks;
  }

  private _isInitialized: boolean = false;

  constructor(private changeDetector: ChangeDetectorRef,
              @Inject(MS_DATE_DEFAULT_OPTIONS) private options: MsDateDefaultOptions) {
  }

  ngAfterViewInit(): void {
    let year: number;
    let month: number;

    if (this._date) {
      year = this.date.getFullYear();
      month = this.date.getMonth();
    } else {
      year = this._initialYear;
      month = this._initialMonth;
    }

    this._monthRange = new MonthRange(year, month);

    this.refreshTemplateView();
    this.refreshDayViews();

    Promise.resolve().then(() => this.changeDetector.markForCheck());

    this._isInitialized = true;
  }

  ngAfterContentInit(): void {

  }

  async setDate(date: Date) {

  }

  async nextMonth() {
    await gsap.gsap.to(this.bodyHost, 0.1, {opacity: 0, translateX: -20});
    this._monthRange = this._monthRange.nextMonth();
    this.refreshDayViews();

    await gsap.gsap.fromTo(this.bodyHost, {opacity: 0, translateX: 20, duration: 0.2}, {opacity: 1, translateX: 0});
  }

  async prevMonth() {
    await gsap.gsap.to(this.bodyHost, 0.1, {opacity: 0, translateX: 20});
    this._monthRange = this._monthRange.prevMonth();
    this.refreshDayViews();

    await gsap.gsap.fromTo(this.bodyHost, {opacity: 0, translateX: -20, duration: 0.2}, {opacity: 1, translateX: 0});
  }

  async setMonthYear(year: number, month: number) {
    await gsap.gsap.to(this.bodyHost, 0.1, {opacity: 0, scale: 0.5});
    this._monthRange = new MonthRange(year, month);
    this.refreshDayViews();
    this.changeDetector.markForCheck();
    await gsap.gsap.fromTo(this.bodyHost, {opacity: 0, scale: 1.3, duration: 0.2}, {opacity: 1, scale: 1});
  }


  refreshTemplateView() {
    this.headerContainer.clear();
    const view = this.headerContainer.createEmbeddedView(this.headerTemplate.template, new MsDatePickerHeaderTemplateContext(this.date));
    view.detectChanges();
  }

  refreshDayViews() {
    const month = this._monthRange;
    const days = [...month.prevRange, ...month.range, ...month.nextRange];

    this.dayContainer.clear();

    days.forEach((item, index) => {
      const context = new MsDatePickerDayTemplateContext(item.toDate(), index, month.range.indexOf(item) < 0);
      const view = this.dayContainer.createEmbeddedView(this.dayTemplate.template, context);
      view.detectChanges();
    })
  }
}

