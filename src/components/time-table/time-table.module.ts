import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MsTimeTable} from './time-table';
import {MsTimeTableItemDef} from './time-table-item-def';
import {MsTimeTableGroup} from './time-table-group';

@NgModule({
  imports: [ CommonModule ],
  declarations: [ MsTimeTable, MsTimeTableItemDef, MsTimeTableGroup ],
  exports: [ MsTimeTable, MsTimeTableItemDef, MsTimeTableGroup ]
})
export class MsTimeTableModule {}
