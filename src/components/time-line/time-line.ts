import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  ContentChild,
  ElementRef,
  Inject,
  Injector,
  Input,
  OnInit,
  ViewChild,
  ViewContainerRef,
  ViewEncapsulation
} from '@angular/core';
import {MsTimeLineItem, MsTimeLineItemDef, MsTimeLineItemGroup} from './time-line-item';
import {MS_DATE_DEFAULT_OPTIONS, MsDateDefaultOptions} from '../date-options';
import {MsTimeLineGroupContent} from './time-line-group-content';

@Component({
  templateUrl: 'time-line.html',
  selector: 'ms-time-line, MsTimeLine',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'ms-time-line'
  }
})
export class MsTimeLine<T extends MsTimeLineItem> implements OnInit, AfterViewInit {
  @Input()
  get items(): T[] {
    return this._items.slice();
  }

  set items(_items: T[]) {
    this._items = _items.sort((t1, t2) => t1.startDate.getDate() - t2.startDate.getDate()).slice();
  }

  private _items: T[];

  @ViewChild('container', {read: ViewContainerRef})
  container: ViewContainerRef;

  @ContentChild(MsTimeLineItemDef)
  itemDef: MsTimeLineItemDef<T>;

  private groupMap: Map<number, T[]> = new Map<number, T[]>();

  private _groups: MsTimeLineItemGroup<T>[];

  private _groupViews: ComponentRef<MsTimeLineGroupContent>[] = [];

  get keys(): Date[] {
    return [...this.groupMap.keys()].map(k => new Date(k));
  }

  get firstItem(): T {
    return this._items[0];
  }

  get lastItem(): T {
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
              private componentFactoryResolver: ComponentFactoryResolver,
              private injector: Injector,
              @Inject(MS_DATE_DEFAULT_OPTIONS) private options: MsDateDefaultOptions) {
  }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    if (!this.itemDef) {
      throw new Error('You must provide a MsTimeLineDef form item template');
    }
    this._items.forEach(item => this.insertItemInGroup(item));
    this.setGroupArray();

    this._groups.forEach(group => {
      this._createGroupView(group);
    })
  }

  _createGroupView(group: MsTimeLineItemGroup<T>): ComponentRef<MsTimeLineGroupContent> {
    const injector: Injector = this._createGroupInjector(group);
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(MsTimeLineGroupContent);
    const result = this.container.createComponent<MsTimeLineGroupContent>(componentFactory, group.index, injector);
    result.hostView.detectChanges();
    this._groupViews.push(result);
    return result;
  }

  _createGroupInjector(group: MsTimeLineItemGroup<T>): Injector {
    return {
      get: (token: any, notFoundValue?: any): any => {
        const customTokens = new WeakMap<any, any>([
          [MsTimeLineItemGroup, group],
          [MsTimeLineItemDef, this.itemDef],
          [MsTimeLine, this]]);

        const value = customTokens.get(token);

        if (typeof value !== 'undefined') {
          return value;
        }

        return this.injector.get<any>(token, notFoundValue);
      }
    };
  }


  addItem(item: T) {
    const key = this.getKey(item);
    let group = this._groups.find(g => g.key === key);

    this._items.push(item);

    if (group) {
      group.items.push(item);
      const view = this._groupViews.find(g => g.instance.group === group);
      view.instance.addItem(item);
    } else {
      group = new MsTimeLineItemGroup();
      group.key = key;
      group.items = [item];

      this._groups.push(group);
      group.index = this._groups.sort((g, h) => g.key - h.key).indexOf(group);
      this.groupMap.set(key, group.items);

      this._createGroupView(group);
    }
  }

  removeItem(item: T): boolean {
    const group = this._groups.find(g => g.contains(item));

    if (!group) {
      return true;
    }

    const view = this._groupViews.find(g => g.instance.group === group);

    if (group.items.length === 1) {
      view.destroy();
      this._groupViews = this._groupViews.filter(g => g !== view);
    } else {
      view.instance.removeItem(item);
    }

    this._items = this._items.filter(i => i !== item);
  }

  insertItemInGroup(item: T) {
    const key = this.getKey(item);

    if (!this.groupMap.has(key)) {
      this.groupMap.set(key, []);
    }

    this.groupMap.get(key).push(item);
  }

  setGroupArray() {
    this._groups = [...this.groupMap.entries()].map((entry, index) => {
      const group = new MsTimeLineItemGroup<T>();
      group.index = index;
      group.key = entry[0];
      group.items = entry[1];
      return group;
    })
  }

  contains(item: T): boolean {
    return this._items.indexOf(item) >= 0
      && this.groupMap.has(this.getKey(item))
      && this.groupMap.get(this.getKey(item)).length > 0;
  }

  getKey(item: T): number {
    return new Date(item.startDate.getFullYear(), item.startDate.getMonth(), item.startDate.getDate()).getTime();
  }
}
