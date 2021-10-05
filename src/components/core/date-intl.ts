export const FR_DAYS_OF_WEEKS = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
export const FR_SHORT_DAYS_OF_WEEK = ['Lu', 'Ma', 'Me', 'Je', 'Ve', 'Sa', 'Di'];


export const EN_DAYS_OF_WEEKS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
export const EN_SHORT_DAYS_OF_WEEK = ['Mon.', 'Tues.', 'Wed.', 'Thurs.', 'Fri.', 'Sat.', 'Sun.'];


export class MsDateIntl {
  dayOfWeeks: string[];
  shortDaysOfWeeks: string[];
  letterDaysOfWeeks: string[];
}

export const frenchDateIntl: MsDateIntl = {
  dayOfWeeks: FR_DAYS_OF_WEEKS,
  shortDaysOfWeeks: FR_SHORT_DAYS_OF_WEEK,
  letterDaysOfWeeks: ['L', 'M', 'M', 'J', 'V', 'S', 'D']
};
