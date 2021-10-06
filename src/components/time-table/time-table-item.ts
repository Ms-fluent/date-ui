import { LocalTime } from '@js-joda/core';

/**
 * Represents a item displayed in a time table.
 */
export interface MsTimeTableItem {

    /** The day of week.
     * You must use the number of the day.
     */
    dayOfWeek: number;

    /**
     * The start hour.
     * If the string type is used, the time format must be hh:mm.
     */
    startHour: LocalTime;


    /**
     * The end hour.
     * If the string type is used, the time format must be hh:mm.
     */
    endHour: LocalTime;
}
