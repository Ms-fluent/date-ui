import {Component} from '@angular/core';
import {MsTimeLine, MsTimeLineItem} from '../../components/time-line';
import * as moment from 'moment';

export class Course implements MsTimeLineItem {
  startDate: Date;
  endDate: Date;
  name: string;
  address: string;
  author;
}

@Component({
  templateUrl: 'time-line.component.html'
})
export class TimeLineComponent {
  items: Course[];

  constructor() {
    const date = new Date();

    this.items = [
      {
        startDate: new Date(2021, 10, 28, 10, 30),
        endDate: new Date(2021, 10, 28, 12, 30),
        name: 'Tests d\'hypothèse',
        address: 'Amphi 130',
        author: 'Rev. Thomas Bayes'
      },
      {
        startDate: new Date(2021, 10, 22, 10, 30),
        endDate: new Date(2021, 10, 22, 12, 30),
        name: 'Description numérique',
        address: 'Amphi 100',
        author: 'Dr. Fei Fei Li'
      },
      {
        startDate: new Date(2021, 10, 22, 14, 30),
        endDate: new Date(2021, 10, 22, 16, 30),
        name: 'Description numérique',
        address: 'Amphi 230',
        author: 'Pr. Richard Feymann'
      },
      {
        startDate: new Date(2021, 10, 22, 7, 30),
        endDate: new Date(2021, 10, 22, 9, 30),
        name: 'Vocabulaire statistique',
        address: 'Amphi 130',
        author: 'Rev. Thomas Bayes'
      },
      {
        startDate: new Date(2021, 10, 28, 7, 30),
        endDate: new Date(2021, 10, 28, 9, 30),
        name: 'Méthodes d\'échantillonage',
        address: 'Amphi 130',
        author: 'Hans Rosling'
      },
      {
        startDate: new Date(2021, 10, 24, 7, 30),
        endDate: new Date(2021, 10, 24, 9, 30),
        name: 'Régression linéaire',
        address: 'Amphi 130',
        author: 'Rev. Thomas Bayes'
      },
      {
        startDate: new Date(2021, 10, 24, 10, 30),
        endDate: new Date(2021, 10, 24, 12, 30),
        name: 'Astronomie',
        address: 'Amphi 100',
        author: 'Isaac Newton'
      }
    ];
  }
}

export function addHour(date: Date) {

}
