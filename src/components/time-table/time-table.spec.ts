import {Component, DebugElement} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {MsTimeTable} from './time-table';
import {MsTimeTableModule} from './time-table.module';
import {By} from '@angular/platform-browser';
import {TIME_TABLE_DATA, UNIQUE_HOURS} from '../element-data';
import {MsTimeTableItem} from "./time-table-item";
import {LocalTime} from "@js-joda/core";
import {MsTimeTableItemDef} from "./time-table-item-def";

describe('TimeTableComponent', () => {
  let fixture: ComponentFixture<TimeTableSpecComponent>;
  let component: TimeTableSpecComponent;

  let timeTableInstance: MsTimeTable;
  let timeTableDebugElement: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TimeTableSpecComponent],
      imports: [MsTimeTableModule]
    }).compileComponents();

    TestBed.compileComponents();
    fixture = TestBed.createComponent(TimeTableSpecComponent);
    fixture.detectChanges();

    component = fixture.componentInstance;
    timeTableDebugElement = fixture.debugElement.query(By.directive(MsTimeTable));
    timeTableInstance = timeTableDebugElement.componentInstance;

    spyOn(timeTableInstance.onchange, 'emit');
  });


  it('Should have template items as items', () => {
    expect(component.items).toEqual(timeTableInstance.items);
  });

  it('Should have a templateDef', () => {
    expect(timeTableInstance.template).toBeDefined();
    expect(timeTableInstance.template).toBeInstanceOf(MsTimeTableItemDef);
  });

  it('Should have daysOfWeek of items without duplicate', () => {
    const uniqueDate = [...new Set(timeTableInstance.items.map(t => t.dayOfWeek))];
    expect(timeTableInstance.getDays()).toEqual(uniqueDate);
  });

  it('Should have hours of items without duplicate', () => {
    const uniqueHours = [...UNIQUE_HOURS.map(t => LocalTime.parse(t))];
    expect(timeTableInstance.getTimes()).toEqual(uniqueHours);
  });

  it('Add items should add it to table items', () => {
    const item1: MsTimeTableItem = {dayOfWeek: 3, startHour: '13:00', endHour: '15:00'};
    const item2: MsTimeTableItem = {dayOfWeek: 3, startHour: '15:00', endHour: '17:00'};

    timeTableInstance.add(item1, item2);
    expect(timeTableInstance.items.indexOf(item1) > 0).toBeTrue();
    expect(timeTableInstance.items.indexOf(item2) > 0).toBeTrue();
  });
});


@Component({
  template: `
      <msTimeTable>
          <div *msTimeTableItemDef="let item of items" style="border: 1px solid red; overflow: hidden; word-break: break-word">{{item | json}}</div>
      </msTimeTable>`,
  selector: 'spec'
})
export class TimeTableSpecComponent {
  items = TIME_TABLE_DATA;
}
