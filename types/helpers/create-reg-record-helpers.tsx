import { WEEK_DAYS } from "../constants/week-days";
import numsIntoWord from "./date-helpers";

export function summerCampRecordAttribObj(weekNum: number) {
  let arrayNum = Array.from({ length: 10 }).map((_val, _idx) => { return _idx + 1 });

  return arrayNum.reduce((curr, prev, index, arr) => {
    return Object.assign({
      [`week_${numsIntoWord(arr[index])}`]: index + 1 <= weekNum ? true : false
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