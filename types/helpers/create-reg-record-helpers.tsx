import { WEEK_DAYS } from "../constants/week-days";
import numsIntoWord from "./date-helpers";

export function summerCampRecordAttribObj(summer_camp_weeks: any) {
  let arrWeekTo10 = Array.from({ length: 10 }).map((_val, _idx) => { return _idx + 1 });

  return arrWeekTo10.reduce((curr, prev, idx) => {
    let tempKey = `week_${numsIntoWord(arrWeekTo10[idx])}`

    return Object.assign({
      [`${tempKey}`]: summer_camp_weeks.includes(tempKey)
    }, curr)
  }, {});
}

export function beforeOrAfterSchoolAttribObject(formData: FormData, key: 'before' | 'after') {
  return WEEK_DAYS.reduce((curr, prev, idx, arr) => {
    let keyStr = `${key}_school_${arr[idx].toLowerCase()}`;
    return Object.assign({
      [`${keyStr}`]: (formData.get(`${keyStr}`) as string) === 'true'
    }, curr)
  }, {});
}