import { ProgramYearCycleSetting } from "@/models/program-year-cycle-setting";
import { Result } from "@/models/result";
import { SummerCampSwimSetting } from "@/models/summer-camp-swim-setting";
import { SummerCampWeekSetting } from "@/models/summer-camp-week-setting";
import { ProgramYearCycleSettingInputTypes } from "@/types/input-types/program-year-cycle-setting-input-types";
import { SummerCampSwimSettingInputTypes } from "@/types/input-types/summer-camp-swim-setting-input-types";
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

  try {
    let response = await result.json();

    return new Result<ProgramYearCycleSetting>({
      ...response,
      data: response.program_settings ?? undefined,
      statusCode: result.status,
    })
  }
  catch (error) {
    return new Result<ProgramYearCycleSetting>({
      response: undefined,
      data: undefined,
      message: result.statusText,
      error: result.statusText,
      statusCode: result.status,
    })
  }
}

export async function updateProgramYearCycleSetting(
  {
    id,
    current_year_cycle,
    next_year_cycle
  }: ProgramYearCycleSettingInputTypes,
  token: string
) {
  let result = await fetch(
    process.env.NEXT_PUBLIC_API_ADMIN_URL! + `/program_settings/update-program-settings`,
    {
      method: "PUT",
      body: JSON.stringify({
        program_setting: {
          id,
          current_year_cycle,
          next_year_cycle
        }
      }),
      ...headers(token)
    }
  );

  try {
    let response = await result.json();

    console.log('response', response)

    return new Result<any>({
      ...response,
      data: response.summer_camp_prices ?? [],
      statusCode: result.status,
    })
  } catch (error) {
    return new Result<any>({
      message: result.statusText,
      error: result.statusText,
      statusCode: result.status,
    })
  }
}

export async function getSummerCampSwimPrices(token: string) {
  let result = await fetch(
    process.env.NEXT_PUBLIC_API_ADMIN_URL! + `/program_settings/edit-summer-camp-prices`,
    { ...headers(token) }
  );

  try {
    let response = await result.json();

    return new Result<SummerCampSwimSetting[]>({
      ...response,
      data: response.summer_camp_prices ?? [],
      statusCode: result.status,
    })
  } catch (error) {
    return new Result<SummerCampSwimSetting[]>({
      response: undefined,
      data: undefined,
      message: result.statusText,
      error: result.statusText,
      statusCode: result.status,
    })
  }

}

export async function updateSummerCampSwimSetting(
  {
    id,
    price,
    child_record_count,
    week_count,
    with_swim_trip
  }: SummerCampSwimSettingInputTypes,
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
          child_record_count,
          week_count,
          with_swim_trip,
        }
      }),
      ...headers(token)
    }
  );

  try {
    let response = await result.json();

    return new Result<any>({
      ...response,
      data: response.summer_camp_prices ?? [],
      statusCode: result.status,
    });
  } catch (error) {

    return new Result<any>({
      message: result.statusText,
      error: result.statusText,
      statusCode: result.status,
    })
  }
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
        }
      }),
      ...headers(token)
    }
  );

  try {
    let response = await result.json();

    return new Result<any>({
      ...response,
      data: response.week_settings ?? [],
      statusCode: result.status,
    });
  } catch (error) {
    return new Result<any>({
      message: result.statusText,
      error: result.statusText,
      statusCode: result.status,
    })
  }
}

export async function getSummerCampPromoSettings(token: string) {
  let result = await fetch(
    process.env.NEXT_PUBLIC_API_ADMIN_URL! + `/summer_camp_promos/edit-all`,
    { ...headers(token) }
  );

  let response = await result.json();

  return new Result<any>({
    ...response,
    data: response.promos ?? [],
    statusCode: result.status,
  })
}

export async function getVacationCampSchedulesSettings(token: string) {
  let result = await fetch(
    process.env.NEXT_PUBLIC_API_ADMIN_URL! + `/vacation_camp_schedule_settings/edit-all`,
    { ...headers(token) }
  );

  let response = await result.json();

  return new Result<any>({
    ...response,
    data: response.promos ?? [],
    statusCode: result.status,
  })
}

export async function updateVacationCampScheduleSetting(token: string) {

}

export async function beforeOrAfterSchoolPromos(token: string, cycleYear: string) { }