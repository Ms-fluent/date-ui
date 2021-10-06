import {
  AfterContentInit,
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  ContentChild,
  ElementRef,
  EventEmitter,
  Inject,
  Injector,
  Input,
  Output,
  StaticProvider,
  ViewChild,
  ViewContainerRef,
  ViewEncapsulation
} from '@angular/core';
import {MsTimeTableItem} from './time-table-item';
import {MsTimeTableItemDef} from './time-table-item-def';
import {MS_TIME_TABLE_DEFAULT_OPTIONS, MsTimeTableDefaultOptions} from './time-table-options';
import {MsTimeTableItemGroup} from './time-table-item-group';
import {MsTimeTableGroup} from './time-table-group';

let uniqueId = 0;

@Component({
  templateUrl: 'time-table.html',
  selector: 'MsTimeTable',
  exportAs: 'msTimeTable',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'ms-time-table',
    '[attr.id]': 'id',
    '[attr.role]': 'role'
  }
})
export class MsTimeTable<T extends MsTimeTableItem> implements AfterContentInit, AfterViewInit {

  private _uniqueId: string = `ms-time-table-${uniqueId++}`;

  /** The unique ID for the table. */
  @Input()
  public id: string = this._uniqueId;

  @Input()
  role: string = 'timetable';

  @Output()
  onchange: EventEmitter<void> = new EventEmitter<void>();

  /**
   * Template of a time table item.
   */
  @ContentChild(MsTimeTableItemDef)
  template: MsTimeTableItemDef<T>;

  @ViewChild('container', {read: ViewContainerRef})
  container: ViewContainerRef;

  @ViewChild('layout')
  layout: ElementRef<HTMLDivElement>;

  get layoutHost(): HTMLDivElement {
    return this.layout.nativeElement;
  }

  _contentLoaded: boolean = false;

  private _items: Array<T>;

  get items(): Array<T> {
    return this._items;
  }

  private groupMap: Map<number, T[]> = new Map<number, T[]>();
  get keys(): Date[] {
    return [...this.groupMap.keys()].map(k => new Date(k));
  }

  private _groups: MsTimeTableItemGroup<T>[];

  private _groupViews: ComponentRef<MsTimeTableGroup<T>>[] = [];

  constructor(private _changeDetectorRef: ChangeDetectorRef,
              private componentFactoryResolver: ComponentFactoryResolver,
              @Inject(MS_TIME_TABLE_DEFAULT_OPTIONS) private _defaultOptions: MsTimeTableDefaultOptions) {

  }

  ngAfterContentInit(): void {
  }

  ngAfterViewInit(): void {
    if (!this.template) {
      throw new Error('You must provide a MsTimeTableItemDef as item template.');
    }
    this._items = this.template.items.slice();

    this._items.forEach(item => this.insertItemInGroup(item));
    this._groups = this.getGroups();
    console.log(this._groups);

    this._groups.forEach(group => {
      this._createGroupView(group);
    })
  }

  addItem(item: T) {
    let group = this._groups.find(g => g.dayOfWeek === item.dayOfWeek);
    this._items.push(item);

    if (group) {
      this._addItemInGroupView(group, item);
    } else {
      group = new MsTimeTableItemGroup();
      group.dayOfWeek = item.dayOfWeek;
      group.items = [item];

      this._groups.push(group);
      group.index = this._groups.sort((g, h) => g.dayOfWeek - h.dayOfWeek).indexOf(group);
      this.groupMap.set(group.dayOfWeek, group.items);

      this._createGroupView(group);
    }
  }

  _addItemInGroupView(group: MsTimeTableItemGroup<T>, item: T) {
    group.items.push(item);
    const view = this._groupViews.find(g => g.instance.group === group);
    view.instance.addItem(item);
  }

  _createGroupView(group: MsTimeTableItemGroup<T>): ComponentRef<MsTimeTableGroup<T>> {
    const injector: Injector = this._createGroupInjector(group);
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory<MsTimeTableGroup<T>>(MsTimeTableGroup);
    const result = this.container.createComponent<MsTimeTableGroup<T>>(componentFactory, group.index, injector);
    result.hostView.detectChanges();
    this._groupViews.push(result);
    return result;
  }

  _createGroupInjector(group: MsTimeTableItemGroup<T>): Injector {
    const providers: StaticProvider[] = [
      {provide: MsTimeTableItemGroup, useValue: group},
      {provide: MsTimeTableItemDef, useValue: this.template},
      {provide: MsTimeTable, useValue: this}
    ];
    return Injector.create({providers});
  }

  insertItemInGroup(item: T) {
    const key = item.dayOfWeek;

    if (!this.groupMap.has(key)) {
      this.groupMap.set(key, []);
    }

    this.groupMap.get(key).push(item);
  }

  getGroups(): MsTimeTableItemGroup<T>[] {
    return [...this.groupMap.entries()].map((entry, index) => {
      const group = new MsTimeTableItemGroup<T>();
      group.index = index;
      group.dayOfWeek = entry[0];
      group.items = entry[1];
      return group;
    })
  }
}

