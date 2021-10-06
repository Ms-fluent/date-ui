import {Directive, Input, TemplateRef} from '@angular/core';
import {MsTimeTableItem} from './time-table-item';

export class MsTimeTableItemContext<T extends MsTimeTableItem = MsTimeTableItem> {
  constructor(public $implicit: T,
              public index: number,
              public total: number) {
  }
}

@Directive({
  selector: '[MsTimeTableItemDef]'
})
export class MsTimeTableItemDef<T extends MsTimeTableItem> {
  /**
   * Items displayed on the time table.
   * Use this property if you want to benefit of IDE autocomplete.
   * The use of this property will override items of the parent timetable.
   */
  @Input('MsTimeTableItemDefOf')
  items: T[];

  constructor(public template: TemplateRef<MsTimeTableItemContext<T>>) {}

}
