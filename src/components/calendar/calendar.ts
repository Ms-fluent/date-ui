import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ElementRef, EmbeddedViewRef,
  forwardRef,
  Inject,
  Input,
  ViewChild,
  ViewContainerRef,
  ViewEncapsulation
} from '@angular/core';
import {MS_DATE_DEFAULT_OPTIONS, MsDateDefaultOptions} from '../date-options';
import {MonthRange} from '../month';
import * as gsap from 'gsap';
import {MsDatePickerDayTemplateContext, MsDatePickerHeaderTemplateContext} from '../date-picker';
import {MsCalendarDayTemplate, MsCalendarHeaderTemplate} from './calendar-template-directives';

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
export class MsCalendar implements AfterViewInit {
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

  @ViewChild('headerContainer', {read: ViewContainerRef})
  headerContainer: ViewContainerRef;

  @ViewChild('dayContainer', {read: ViewContainerRef})
  dayContainer: ViewContainerRef;

  @ViewChild(forwardRef(() => MsCalendarHeaderTemplate))
  viewTemplateHeader: MsCalendarHeaderTemplate;

  @ContentChild(forwardRef(() => MsCalendarHeaderTemplate))
  contentTemplateHeader: MsCalendarHeaderTemplate;

  @ViewChild(forwardRef(() => MsCalendarDayTemplate))
  viewTemplateDay: MsCalendarDayTemplate;

  @ContentChild(forwardRef(() => MsCalendarDayTemplate))
  contentTemplateDay: MsCalendarDayTemplate;

  get headerTemplate(): MsCalendarHeaderTemplate {
    return this.contentTemplateHeader || this.viewTemplateHeader;
  }

  get dayTemplate(): MsCalendarDayTemplate {
    return this.contentTemplateDay || this.viewTemplateDay;
  }

  private _monthRange: MonthRange;
  get monthRange(): MonthRange {
    return this._monthRange;
  }

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


  private _isInitialized: boolean = false;

  private headerView: EmbeddedViewRef<MsDatePickerHeaderTemplateContext>;

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

    this.createHeaderView();
    this.refreshDayViews();

    Promise.resolve().then(() => this.changeDetector.markForCheck());

    this._isInitialized = true;
  }


  async nextMonth() {
    await gsap.gsap.to(this.bodyHost, 0.1, {opacity: 0, translateX: -20});
    this._monthRange = this._monthRange.nextMonth();
    this.refreshDayViews();
    this.refreshHeaderView();

    await gsap.gsap.fromTo(this.bodyHost, {opacity: 0, translateX: 20, duration: 0.2}, {opacity: 1, translateX: 0});
  }

  async prevMonth() {
    await gsap.gsap.to(this.bodyHost, 0.1, {opacity: 0, translateX: 20});
    this._monthRange = this._monthRange.prevMonth();
    this.refreshHeaderView();
    this.refreshDayViews();

    await gsap.gsap.fromTo(this.bodyHost, {opacity: 0, translateX: -20, duration: 0.2}, {opacity: 1, translateX: 0});
  }

  async currentMonth() {
    const date = new Date();
    return this.setMonthYear(date.getFullYear(), date.getMonth());
  }

  async setMonthYear(year: number, month: number) {
    await gsap.gsap.to(this.bodyHost, 0.1, {opacity: 0, scale: 0.5});
    this._monthRange = new MonthRange(year, month);
    this.refreshDayViews();
    this.refreshHeaderView();
    await gsap.gsap.fromTo(this.bodyHost, {opacity: 0, scale: 1.3, duration: 0.2}, {opacity: 1, scale: 1});
  }


  createHeaderView() {
    this.headerContainer.clear();

    const context = new MsDatePickerHeaderTemplateContext(this.date);
    this.headerView = this.headerContainer.createEmbeddedView(this.headerTemplate.template, context);
    this.headerView.detectChanges();
  }

  refreshHeaderView() {
    this.headerView.context.$implicit = this._monthRange.first.toDate();
    this.headerView.markForCheck();
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
