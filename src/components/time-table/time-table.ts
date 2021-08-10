import {
  AfterContentInit, AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild, ElementRef, EventEmitter, Inject,
  Input, Output, QueryList, ViewChild, ViewChildren, ViewContainerRef,
  ViewEncapsulation
} from '@angular/core';
import {LocalTime} from '@js-joda/core';
import {MsTimeTableItem} from './time-table-item';
import {MsTimeTableItemContext, MsTimeTableItemDef} from './time-table-item-def';
import {MS_TIME_TABLE_DEFAULT_OPTIONS, MsTimeTableColumnWidth, MsTimeTableDefaultOptions} from './time-table-options';

let uniqueId = 0;

@Component({
  templateUrl: 'time-table.html',
  selector: 'ms-time-table, msTimeTable, MsTimeTable',
  exportAs: 'msTimeTable',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'ms-time-table',
    '[attr.id]': 'id',
    '[attr.role]': 'role'
  }
})
export class MsTimeTable implements AfterContentInit, AfterViewInit {

  private _uniqueId: string = `ms-time-table-${uniqueId++}`;

  /** The unique ID for the table. */
  @Input()
  public id: string = this._uniqueId;

  @Input()
  role: string = 'timetable';

  /** The width of the columns. */
  @Input()
  columnWidth: MsTimeTableColumnWidth = this._defaultOptions.columnWidth;


  @Input()
  rowHeight: number = this._defaultOptions.rowHeight;

  /**
   * Initial provided items.
   */
  @Input('items')
  inputItems: MsTimeTableItem[] = [];

  /** The form used to display days of week. */
  @Input()
  dayFormat: 'short' | 'normal' = this._defaultOptions.dayFormat;

  /** Formatter used to display time. */
  @Input()
  timeFormat: string = this._defaultOptions.timeFormat;


  @Input()
  compareFn: (t1: MsTimeTableItem, t2: MsTimeTableItem) => boolean = this._defaultOptions.compareFn;


  @Output()
  onchange: EventEmitter<void> = new EventEmitter<void>();

  /**
   * Template of a time table item.
   */
  @ContentChild(MsTimeTableItemDef)
  template: MsTimeTableItemDef;

  @ViewChild('container', {read: ViewContainerRef})
  container: ViewContainerRef;

  @ViewChildren('row')
  rows: QueryList<ElementRef<HTMLElement>>;

  @ViewChildren('column')
  columns: QueryList<ElementRef<HTMLElement>>;

  _contentLoaded: boolean = false;

  private _items: Array<MsTimeTableItem>;
  get items(): Array<MsTimeTableItem> {
    return this._items;
  }

  constructor(private _changeDetectorRef: ChangeDetectorRef,
              @Inject(MS_TIME_TABLE_DEFAULT_OPTIONS) private _defaultOptions: MsTimeTableDefaultOptions) {

  }

  ngAfterContentInit() {
    if (!this.template) {
      throw new Error('Missing time-Table template. Define a msTimeTableDef inside the component.')
    }

    if (this.template.items) {
      this._items = this.template.items.slice();
    } else if (this.inputItems) {
      this._items = this.inputItems.slice();
    } else {
      throw new Error('Missing input items.')
    }
    this._contentLoaded = true;
  }

  ngAfterViewInit(): void {
    this.items.forEach((item, index) => this._createItemView(item, index));

    console.log(this.rows.length)

  }

  /**
   * Append new items on the table.
   * @param items Items to add.
   */
  add(...items: MsTimeTableItem[]) {
    for (const item of items) {
      this._addItem(item);
    }
  }

  _addItem(item: MsTimeTableItem) {
    if (!this.contains(item)) {
      this._items.push(item);
    }
  }

  /**
   * Removes items on the table.
   * @param items Items to remove.
   */
  remove(...items: MsTimeTableItem[]) {
    for (const item of items) {

    }
  }


  removeIf(filterFn: (item: MsTimeTableItem) => boolean) {

  }

  _createItemView(item: MsTimeTableItem, index: number) {
    const context = new MsTimeTableItemContext(item, index, this.items.length);
    const viewRef = this.container.createEmbeddedView(this.template.template, context, index);

    const node: HTMLDivElement = viewRef.rootNodes[0];
    node.className = 'ms-time-table-item';

    node.style.height = `${this.getRowHeight(index + 1)}px`;
    node.style.left = `${this.getCellX(index)}px`;
    node.style.top = `${this.getCellY(index)}px`;
    node.style.width = `${this.getCellWidth(index)}px`;


    viewRef.detectChanges();
  }

  /**
   * Get times displayed at the left boundary of the table.
   * If the string table is used, you must use the HH:mm format.
   */
  getTimes(): Array<LocalTime> {
    const hours: Array<string | LocalTime> = [...this._items.map(t => [t.startHour, t.endHour])]
      .reduce((a, b) => a.concat(b));

    let uniqueHours = [...new Set(hours)].map(t => {
      if (t instanceof LocalTime) {
        return t;
      }
      return LocalTime.parse(t);
    });

    uniqueHours = uniqueHours.sort((h1, h2) => h1.toSecondOfDay() - h2.toSecondOfDay());
    return uniqueHours
  }

  /**
   * Days of week displayed at the top of the table.
   */
  getDays(): Array<number> {
    return [...new Set(this.items.map(t => t.dayOfWeek))];
  }

  contains(item: MsTimeTableItem) {
    if (item === undefined) {
      return false;
    }

    return this._items.find(_item => this.compareFn(_item, item));
  }

  getDay(index: number) {
    return this._defaultOptions.intlProvider.daysOfWeek[index];
  }

  getRowTranslate(index: number): number {
    if (index === 0) {
      return 0;
    }
    return this.getRowHeight(index) / 2;
  }

  getRowHeight(index: number): number {
    if (index === 0) {
      return 0;
    }
    const prevTime = this.getTimes()[index - 1];
    const prevMinutes = (this.getTimes()[index].toSecondOfDay() - prevTime.toSecondOfDay()) / 60 / 60 * this.rowHeight;
    return prevMinutes;
  }

  getCellX(index: number): number {
    const x = this.columns.toArray()[index].nativeElement.offsetLeft;
    return x;
  }

  getCellY(index: number): number {
    const y = this.rows.toArray()[index].nativeElement.offsetTop;
    return y;
  }

  getCellWidth(index: number): number {
    return this.columns.toArray()[index].nativeElement.offsetWidth;
  }
}

