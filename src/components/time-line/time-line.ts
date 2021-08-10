import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Inject,
  Input,
  OnInit,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {MsTimeLineItem} from './time-line-item';
import {MS_DATE_DEFAULT_OPTIONS, MsDateDefaultOptions} from "../date-options";

@Component({
  templateUrl: 'time-line.html',
  selector: 'ms-time-line, MsTimeLine',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'ms-time-line'
  }
})
export class MsTimeLine implements OnInit, AfterViewInit {
  @Input()
  get items(): MsTimeLineItem[] {
    return this._items.slice();
  }

  set items(_items: MsTimeLineItem[]) {
    this._items = _items.sort((t1, t2) => t1.startDate.getDate() - t2.startDate.getDate()).slice();
  }

  private _items: MsTimeLineItem[];

  private groups: Map<number, MsTimeLineItem[]> = new Map<number, MsTimeLineItem[]>();

  get keys(): Date[] {
    return [...this.groups.keys()].map(k => new Date(k));
  }

  get firstItem(): MsTimeLineItem {
    return this._items[0];
  }

  get lastItem(): MsTimeLineItem {
    return this._items[this._items.length - 1];
  }

  @ViewChild('layout')
  layout: ElementRef<HTMLDivElement>;

  get layoutHost(): HTMLDivElement {
    return this.layout.nativeElement;
  }

  get days(): string[] {
    return this.options.intl.dayOfWeeks;
  }

  constructor(private changeDetector: ChangeDetectorRef,
              @Inject(MS_DATE_DEFAULT_OPTIONS) private options: MsDateDefaultOptions) {
  }

  ngOnInit(): void {
    this._items.forEach(item => this.insertItemInGroup(item));

    console.log(this.keys)
  }

  ngAfterViewInit(): void {

  }


  addItem(item: MsTimeLineItem) {

  }

  removeItem(item: MsTimeLineItem) {

  }

  insertItemInGroup(item: MsTimeLineItem) {
    const date = new Date(item.startDate.getFullYear(), item.startDate.getMonth(), item.startDate.getDate()).getTime();

    if (!this.groups.has(date)) {
      this.groups.set(date, []);
    }

    this.groups.get(date).push(item);
  }
}
