import {Directive, TemplateRef} from '@angular/core';
import moment from 'moment';

export interface MsTimeLineItem {
  startDate: Date;
  endDate: Date,
}

export class MsTimeLineItemGroup<T extends MsTimeLineItem> {
  index: number;
  key: number;
  items: T[] = [];

  get date(): Date {
    return new Date(this.key)
  }

  formatDate(): string {
    return moment(this.date).format('DD MMMM yyyy');
  }

  get formatDay(): string {
    const d = new Date();
    const diff = moment(this.date).diff(moment(new Date(d.getFullYear(), d.getMonth(), d.getDate())), 'days');

    if (diff === -1) {
      return 'Hier'
    } else if (diff === 0) {
      return 'Aujourd\'hui';
    } else if (diff === 1) {
      return 'Demain';
    }
    return moment(this.date).format('dddd');
  }

  contains(item: T): boolean {
    return this.items.indexOf(item) >= 0;
  }
}


export class MsTimeLineItemContext<T extends MsTimeLineItem = any> {
  constructor(public $implicit: T) {}
}

@Directive({
  selector: '[ms-time-line-item-def], [MsTimeLineItemDef]'
})
export class MsTimeLineItemDef<T extends MsTimeLineItem> {
  constructor(public template: TemplateRef<MsTimeLineItemContext<T>>) {
  }
}
