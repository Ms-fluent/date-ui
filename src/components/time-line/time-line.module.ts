import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MsTimeLine} from './time-line';
import {MsTimeLineItemDef} from './time-line-item';
import {MsTimeLineGroupContent} from './time-line-group-content';

@NgModule({
  imports: [ CommonModule ],
  declarations: [ MsTimeLine, MsTimeLineItemDef, MsTimeLineGroupContent ],
  exports: [ MsTimeLine, MsTimeLineItemDef, MsTimeLineGroupContent ]
})
export class MsTimeLineModule {}
