import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MsTimeLine} from './time-line';

@NgModule({
  imports: [ CommonModule ],
  declarations: [ MsTimeLine ],
  exports: [ MsTimeLine ]
})
export class MsTimeLineModule {}
