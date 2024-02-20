import { ProgramYearCycleSetting } from "@/models/program-year-cycle-setting";
import { Result } from "@/models/result";
import { SummerCampSwimSetting } from "@/models/summer-camp-swim-setting";
import { SummerCampWeekSetting } from "@/models/summer-camp-week-setting";
import { SummerCampWeekSettingInputTypes } from "@/types/input-types/summer-camp-week-setting-input-types";

function headers(token: string) {
  return {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token!}`
    }
  }
}

export async function getProgramYearCycleSettings(token: string) {
  let result = await fetch(
    process.env.NEXT_PUBLIC_API_ADMIN_URL! + `/program_settings/edit-program-settings`,
    { ...headers(token) }
  )

  let response = await result.json();

  return new Result<ProgramYearCycleSetting>({
    ...response,
    data: response.program_settings ?? undefined,
    statusCode: result.status,
  })
}

export async function getSummerCampSwimPrices(token: string) {
  let result = await fetch(
    process.env.NEXT_PUBLIC_API_ADMIN_URL! + `/program_settings/edit-summer-camp-prices`,
    { ...headers(token) }
  );

  let response = await result.json();

  return new Result<SummerCampSwimSetting[]>({
    ...response,
    data: response.summer_camp_prices ?? [],
    statusCode: result.status,
  })
}

export async function updateSummerCampSwimSetting(
  {
    id,
    price
  }: any,
  token: string
) {
  let result = await fetch(
    process.env.NEXT_PUBLIC_API_ADMIN_URL! + `/program_settings/summer-camp-prices-update`,
    {
      method: 'PUT',
      body: JSON.stringify({
        summer_camp_price: {
          id,
          price,
        }
      }),
      ...headers(token)
    }
  );

  let response = await result.json();

  console.log('response', response)

  return new Result<any>({
    ...response,
    data: response.summer_camp_prices ?? [],
    statusCode: result.status,
  })
}

export async function getSummerCampWeekPrices(token: string) {
  let result = await fetch(
    process.env.NEXT_PUBLIC_API_ADMIN_URL! + `/summer_camp_week_settings/edit`,
    { ...headers(token) }
  );

  let response = await result.json();

  return new Result<SummerCampWeekSetting[]>({
    ...response,
    data: response.week_settings ?? [],
    statusCode: result.status,
  })
}

export async function updateSummerCampWeekSetting(
  {
    id,
    name,
    start_date,
    capacity,
    notes,
    enabled,
  }: SummerCampWeekSettingInputTypes
  , token: string
) {
  let result = await fetch(
    process.env.NEXT_PUBLIC_API_ADMIN_URL! + `/summer_camp_week_settings/update`,
    {
      method: 'PUT',
      body: JSON.stringify({
        summer_camp_weeks: {
          id,
          name,
          start_date,
          capacity,
          notes,
          enabled,
        }
      }),
      ...headers(token)
    }
  );

  let response = await result.json();

  return new Result<any>({
    ...response,
    data: response.data ?? undefined,
    statusCode: result.status
  })

}

export async function summerCampPromos(token: string, week: string) {

}

export async function vacationCampSchedules(token: string, camp: string) {

}

export async function beforeOrAfterSchoolPromos(token: string, cycleYear: string) { }