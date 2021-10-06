import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  EmbeddedViewRef,
  ViewChild,
  ViewContainerRef,
  ViewEncapsulation
} from '@angular/core';
import {MsTimeTableItem} from './time-table-item';
import {MsTimeTableItemContext, MsTimeTableItemDef} from './time-table-item-def';
import {MsTimeTableItemGroup} from './time-table-item-group';

@Component({
  templateUrl: 'time-table-group.html',
  selector: 'MsTimeTableGroup',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'ms-time-table-group'
  }
})
export class MsTimeTableGroup<T extends MsTimeTableItem = MsTimeTableItem> implements AfterViewInit {
  @ViewChild('container', {read: ViewContainerRef})
  _container: ViewContainerRef;

  _views: EmbeddedViewRef<MsTimeTableItemContext<T>>[] = [];

  constructor(private _group: MsTimeTableItemGroup<T>,
              private _templateDef: MsTimeTableItemDef<T>) {
  }

  ngAfterViewInit(): void {
    this._container.clear();

    this.group.items.forEach((item) => {
      this.addItem(item);
    });
  }

  addItem(item: T) {
    this.group.items.push(item);
    const index = this.group.getItemIndex(item);
    const context = new MsTimeTableItemContext(item, index, this._group.items.length + 1);
    const viewRef = this._container.createEmbeddedView(this._templateDef.template, context, index);
    viewRef.detectChanges();
    this._views.push(viewRef);
  }

  removeItem(item: T) {
    const view = this._views.find(v => v.context.$implicit === item);
    this._views = this._views.filter(v => v.context.$implicit !== item);

    if (view) {
      view.destroy();
      this.group.remove(item);
    }
    this._views.forEach(viewItem => {
      viewItem.context.index = this.group.getItemIndex(viewItem.context.$implicit);
      viewItem.context.total = this.group.length;
    })
  }

  get group(): MsTimeTableItemGroup<T> {
    return this._group;
  }
}
