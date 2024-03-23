import { toFirstUpperCase } from "./string-helpers";
import { parse } from 'date-fns';

export function setDayNumber(strDayName: string) {
  switch (strDayName) {
    case 'day_one': return 1;
    case 'day_two': return 2;
    case 'day_three': return 3;
    case 'day_four': return 4;
    case 'day_five': return 5;
    case 'day_six': return 6;
    case 'day_seven': return 7;
    case 'day_eight': return 8;
    case 'day_nine': return 9;
    case 'day_ten': return 10;
    case 'day_eleven': return 11;
    case 'day_twelve': return 12;
    case 'day_thirteen': return 13;
    case 'day_fourteen': return 14;
    case 'day_fifteen': return 15;
    case 'day_sixteen': return 16;
    case 'day_seventeen': return 17;
    case 'day_eighteen': return 18;
    case 'day_nineteen': return 19;
    case 'day_twenty': return 20;
    case 'day_twenty_one': return 21;
    case 'day_twenty_two': return 22;
    case 'day_twenty_three': return 23;
    case 'day_twenty_four': return 24;
    case 'day_twenty_five': return 25;
    case 'day_twenty_six': return 26;
    case 'day_twenty_seven': return 27;
    case 'day_twenty_eight': return 28;
    case 'day_twenty_nine': return 29;
    case 'day_thirty': return 30;
    default: return 31;
  }
}

export function getMonthNumber(strMon: string) {
  switch (strMon) {
    case 'january': return 0;
    case 'february': return 1;
    case 'march': return 2;
    case 'april': return 3;
    case 'may': return 4;
    case 'june': return 5;
    case 'july': return 6;
    case 'august': return 7;
    case 'september': return 8;
    case 'october': return 9;
    case 'november': return 10;
    default: return 11;
  }
}

export function dateString(
  date: string,
  options?: Intl.DateTimeFormatOptions
) {
  return new Date(date).toLocaleDateString('en-US', options);
}

export function dateTimeString(
  date: string,
  options?: Intl.DateTimeFormatOptions
) {
  return new Date(date).toLocaleString('en-US', options);
}

export default function numsIntoWord(num: number) {
  switch (num) {
    case 2: return 'two';
    case 3: return 'three';
    case 4: return 'four';
    case 5: return 'five';
    case 10: return 'ten';
    case 6: return 'six';
    case 7: return 'seven';
    case 8: return 'eight';
    case 9: return 'nine';
    case 1: return 'one';
    default: return ' '
  }
}

export function getDayNumArr(arr?: { [key: string]: any }) {
  let result: any[] = [];

  if (arr) {
    let {
      id,
      name,
      month,
      updated_at,
      created_at,
      capacity,
      year,
      program_id,
      deleted,
      ...rest
    } = arr;

    Object.entries(rest).forEach(([key, value]) => {
      if (value) {
        result.push(setDayNumber(key))
      }
    });
  }
  return result;
}

export function parseDates(
  dateStr?: string,
  data?: { [key: string]: any },
  formatParse: string = 'yyyy-MMMM',
) {
  let strDate = `${data?.year?.toString()}-${toFirstUpperCase(data?.month ?? '')}`;

  if (dateStr) { strDate += `-${dateStr}`; }

  return parse(strDate, formatParse, new Date());
}