import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MsTimeTable} from './time-table';
import {MsTimeTableItemDef} from './time-table-item-def';

@NgModule({
  imports: [ CommonModule ],
  declarations: [ MsTimeTable, MsTimeTableItemDef ],
  exports: [ MsTimeTable, MsTimeTableItemDef ]
})
export class MsTimeTableModule {}
