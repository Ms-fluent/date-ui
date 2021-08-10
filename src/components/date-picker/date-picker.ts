import {
  AfterContentInit,
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ElementRef,
  forwardRef,
  Inject,
  Input,
  ViewChild,
  ViewContainerRef,
  ViewEncapsulation
} from '@angular/core';
import * as moment from 'moment';
import * as gsap from 'gsap';
import {MonthRange} from '../month';
import {MS_DATE_DEFAULT_OPTIONS, MsDateDefaultOptions} from '../date-options';
import {MsDatePickerHeaderTemplate, MsDatePickerHeaderTemplateContext} from './date-picker-header';
import {MsDatePickerDayTemplate} from "./date-picker-day";


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

  }

  private _date: Date = new Date();

  get year(): any {
    return this._date.getFullYear();
  }

  formatDate(): string {
    return moment(this.date).format('dddd DD MMMM')
  }

  formatMonth(): string {
    return this.monthRange.first.format('MMMM YYYY');
  }

  get daysOfWeeks(): string[] {
    return this.options.intl.shortDaysOfWeeks;
  }

  constructor(private changeDetector: ChangeDetectorRef,
              @Inject(MS_DATE_DEFAULT_OPTIONS) private options: MsDateDefaultOptions) {
    this._monthRange = new MonthRange();
  }

  ngAfterViewInit(): void {
    console.log(this.headerTemplate)
    this.refreshTemplateView();
  }

  ngAfterContentInit(): void {

  }

  async nextMonth() {
    await gsap.gsap.to(this.bodyHost, 0.1, {opacity: 0, translateX: -20});
    this._monthRange = this._monthRange.nextMonth();
    this.changeDetector.markForCheck();

    await gsap.gsap.fromTo(this.bodyHost, {opacity: 0, translateX: 20, duration: 0.2}, {opacity: 1, translateX: 0});
  }

  async prevMonth() {
    await gsap.gsap.to(this.bodyHost, 0.1, {opacity: 0, translateX: 20});
    this._monthRange = this._monthRange.prevMonth();
    this.changeDetector.markForCheck();

    await gsap.gsap.fromTo(this.bodyHost, {opacity: 0, translateX: -20, duration: 0.2}, {opacity: 1, translateX: 0});
  }


  refreshTemplateView() {
    this.headerContainer.clear();
    const view = this.headerContainer.createEmbeddedView(this.headerTemplate.template, new MsDatePickerHeaderTemplateContext(this.date));
    view.detectChanges();
  }
}

