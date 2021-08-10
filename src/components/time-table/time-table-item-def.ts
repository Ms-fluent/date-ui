import {Directive, Input, TemplateRef} from '@angular/core';
import {MsTimeTableItem} from './time-table-item';

export class MsTimeTableItemContext {
  constructor(public $implicit: MsTimeTableItem,
              public index: number,
              public total: number) {
  }
}

@Directive({
  selector: '[msTimeTableItemDef], [ms-timeTableItemDef]'
})
export class MsTimeTableItemDef {

  /**
   * Items displayed on the time table.
   * Use this property if you want to benefit of IDE autocomplete.
   * The use of this property will override items of the parent timetable.
   */
  @Input('msTimeTableItemDefOf')
  _items1: MsTimeTableItem[];

  /**
   * Items displayed on the time table.
   * Use this property if you want to benefit of IDE autocomplete.
   * The use of this property will override items of the parent timetable.
   */
  @Input('ms-timeTableItemDefOf')
  _items2: MsTimeTableItem[];

  constructor(public template: TemplateRef<MsTimeTableItemContext>) {

  }

  get items(): MsTimeTableItem[] {
    if (this._items1) {
      return this._items1;
    }
    return this._items2;
  }
}
