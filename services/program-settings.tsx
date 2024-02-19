import { Result } from "@/models/result";
import { SummerCampWeekSetting } from "@/models/summer-week-setting";

function headers(token: string) {
  return {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token!}`
    }
  }
}

export async function summerSwimPrices(token: string, isSwimming: boolean) {

}

export async function getSummerWeekPrices(token: string) {
  let result = await fetch(
    process.env.NEXT_PUBLIC_API_ADMIN_URL! + `/summer_camp_week_settings/edit`,
    { ...headers(token) }
  );

  let response = await result.json();

  return new Result<SummerCampWeekSetting[]>({
    ...response,
    data: response.week_settings ?? []
  })
}

export async function summerCampPromos(token: string, week: string) {

}

export async function vacationCampSchedules(token: string, camp: string) {

}

export async function beforeOrAfterSchoolPromos(token: string, cycleYear: string) { }