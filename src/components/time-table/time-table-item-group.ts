import {MsTimeTableItem} from './time-table-item';
import {FR_DAYS_OF_WEEKS} from '../core';


export class MsTimeTableItemGroup<T extends MsTimeTableItem> {
  index: number;
  dayOfWeek: number;
  items: T[] = [];

  formatDay(): string {
    return FR_DAYS_OF_WEEKS[this.dayOfWeek];
  }

  getItemIndex(item: T) {
    return this.items.sort(((a, b) => a.startHour.second() - b.startHour.second())).indexOf(item);
  }

  contains(item: T): boolean {
    return this.items.indexOf(item) >= 0;
  }

  remove(item: T) {
    this.items = this.items.filter(i => i !== item);
  }

  add(item: T) {
    this.items.push(item);
    this.items.sort(((a, b) => a.startHour.second() - b.startHour.second())).indexOf(item);
  }

  get length(): number {
    return this.items.length;
  }
}
