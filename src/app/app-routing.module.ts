import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DatePickerComponent} from './date-picker/date-picker.component';
import {CalendarComponent} from './calendar/calendar.component';
import {TimeLineComponent} from './time-line/time-line.component';
import {TimeTableComponent} from './time-table/time-table.component';

const routes: Routes = [
  {path: '', component: DatePickerComponent },
  {path: 'time-table', component: TimeTableComponent },
  {path: 'time-line', component: TimeLineComponent },
  {path: 'date-picker', component: DatePickerComponent },
  {path: 'calendar', component: CalendarComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
