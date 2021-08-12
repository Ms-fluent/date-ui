import {AfterViewInit, Component, EmbeddedViewRef, ViewChild, ViewContainerRef, ViewEncapsulation} from '@angular/core';
import {MsTimeLineItem, MsTimeLineItemContext, MsTimeLineItemDef, MsTimeLineItemGroup} from './time-line-item';

@Component({
  templateUrl: 'time-line-group-content.html',
  encapsulation: ViewEncapsulation.None,
  host: {
    'class': 'ms-time-line-group'
  }
})
export class MsTimeLineGroupContent<T extends MsTimeLineItem> implements AfterViewInit {

  @ViewChild('itemContainer', {read: ViewContainerRef})
  itemContainer: ViewContainerRef;

  private _itemViews: Array<EmbeddedViewRef<MsTimeLineItemContext>> = [];

  constructor(public group: MsTimeLineItemGroup<T>,
              private templateDef: MsTimeLineItemDef<T>) {
  }

  ngAfterViewInit(): void {
    this.itemContainer.clear();
    this.group.items.forEach((item) => {
      this.addItem(item);
    })
  }

  addItem(item: T) {
    const context = new MsTimeLineItemContext(item);

    const index = this.group.items.sort(((a, b) => a.startDate.getTime() - b.startDate.getTime())).indexOf(item);

    const viewRef = this.itemContainer.createEmbeddedView(this.templateDef.template, context, index);
    viewRef.detectChanges();
    this._itemViews.push(viewRef);
  }

  removeItem(item: MsTimeLineItem) {
    const view = this._itemViews.find(v => v.context.$implicit === item);

    if (view) {
      view.destroy();
      this.group.items = this.group.items.filter(i => i !== item);
    }
  }
}
