import {Component, ViewChild} from '@angular/core';
import {MsTimeLine, MsTimeLineItem} from '../../components/time-line';
import * as moment from 'moment';

export class Course implements MsTimeLineItem {
  startDate: Date;
  endDate: Date;
  name: string;
  address: string;
  author: string;
}

class CourseModel {
  name: string = 'Item name';
  startDate: string = '08/12/2021 10:00';
  endDate: string = '08/12/2021 12:00';

  get course(): Course {
    return {
      name: this.name,
      startDate: new Date(this.startDate),
      endDate: new Date(this.endDate),
      address: '',
      author: ''
    }
  }
}

@Component({
  templateUrl: 'time-line.component.html'
})
export class TimeLineComponent {
  model: CourseModel = new CourseModel();

  items: Course[];

  @ViewChild(MsTimeLine)
  timeLine: MsTimeLine<Course>;

  constructor() {
    const date = new Date();

    const m = new Date().getMonth();
    const d = new Date().getDate();

    this.items = [
      {
        startDate: new Date(2021, m, d - 1, 10, 30),
        endDate: new Date(2021, m, d - 1, 12, 30),
        name: 'Biologie',
        address: 'Amphi 130',
        author: 'Rev. Thomas Bayes'
      },
      {
        startDate: new Date(2021, m, d, 6, 30),
        endDate: new Date(2021, m, d, 8, 30),
        name: 'Tests d\'hypothèse',
        address: 'Amphi 130',
        author: 'Rev. Thomas Bayes'
      },
      {
        startDate: new Date(2021, m, d, 11, 0),
        endDate: new Date(2021, m, d, 13, 0),
        name: 'Description numérique',
        address: 'Amphi 100',
        author: 'Dr. Fei Fei Li'
      },
      {
        startDate: new Date(2021, m, d + 1, 14, 30),
        endDate: new Date(2021, m, d + 1, 16, 30),
        name: 'Description numérique',
        address: 'Amphi 230',
        author: 'Pr. Richard Feymann'
      },
      {
        startDate: new Date(2021, m, 22, 7, 30),
        endDate: new Date(2021, m, 22, 9, 30),
        name: 'Vocabulaire statistique',
        address: 'Amphi 130',
        author: 'Rev. Thomas Bayes'
      },
      {
        startDate: new Date(2021, m, 28, 7, 30),
        endDate: new Date(2021, m, 28, 9, 30),
        name: 'Méthodes d\'échantillonage',
        address: 'Amphi 130',
        author: 'Hans Rosling'
      },
      {
        startDate: new Date(2021, m, 24, 7, 30),
        endDate: new Date(2021, m, 24, 9, 30),
        name: 'Régression linéaire',
        address: 'Amphi 130',
        author: 'Rev. Thomas Bayes'
      },
      {
        startDate: new Date(2021, m, 24, 10, 30),
        endDate: new Date(2021, m, 24, 12, 30),
        name: 'Astronomie',
        address: 'Amphi 100',
        author: 'Isaac Newton'
      }
    ];
  }

  formatDate(date: Date): string {
    const d = moment(date);
    return `${d.format('HH')}h ${d.format('mm')}`;
  }

  delete(item: Course) {
    this.items = this.items.filter(i => i !== item);
    this.timeLine.removeItem(item);
  }

  addCourse() {
    const course = this.model.course;
    console.log(course);
    this.timeLine.addItem(course);
    this.items.push(course)
  }
}

export function addHour(date: Date) {

}
