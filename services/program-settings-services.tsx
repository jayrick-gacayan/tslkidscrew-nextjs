import { BeforeOrAfterSchoolSetting } from "@/models/before-or-after-school-setting";
import { ProgramYearCycleSetting } from "@/models/program-year-cycle-setting";
import { Result } from "@/models/result";
import { SummerCampPromoSetting } from "@/models/summer-camp-promo-setting";
import { SummerCampSwimSetting } from "@/models/summer-camp-swim-setting";
import { SummerCampWeekSetting } from "@/models/summer-camp-week-setting";
import { VacationCampSetting } from "@/models/vacation-camp-setting";
import { authHeaders } from "@/types/helpers/auth-headers";
import { ProgramYearCycleSettingInputTypes } from "@/types/input-types/program-year-cycle-setting-input-types";
import { SummerCampSwimSettingInputTypes } from "@/types/input-types/summer-camp-swim-setting-input-types";
import { SummerCampWeekSettingInputTypes } from "@/types/input-types/summer-camp-week-setting-input-types";

export async function getProgramYearCycleSettings(token: string) {
  let result = await fetch(
    process.env.NEXT_PUBLIC_API_ADMIN_URL! + `/program_settings/edit-program-settings`,
    { ...authHeaders(token) }
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
      ...authHeaders(token)
    }
  );

  try {
    let response = await result.json();

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
    { ...authHeaders(token) }
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
      ...authHeaders(token)
    }
  );

  try {
    let response = await result.json();

    return new Result<SummerCampSwimSetting>({
      ...response,
      message: response.message ?? result.statusText,
      data: response.summer_camp_prices ?? undefined,
      statusCode: result.status,
    });
  } catch (error) {

    return new Result<any>({
      response: undefined,
      message: result.statusText,
      error: result.statusText,
      statusCode: result.status,
    })
  }
}

export async function getSummerCampWeekPrices(token: string) {
  let result = await fetch(
    process.env.NEXT_PUBLIC_API_ADMIN_URL! + `/summer_camp_week_settings/edit`,
    { ...authHeaders(token) }
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

  console.log('id', id)
  let result = await fetch(
    process.env.NEXT_PUBLIC_API_ADMIN_URL! + `/summer_camp_week_settings/update`,
    {
      method: 'PATCH',
      body: JSON.stringify({
        summer_camp_weeks: {
          id,
          name,
          start_date,
          capacity,
          notes,
        }
      }),
      ...authHeaders(token)
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
    { ...authHeaders(token) }
  );

  let response = await result.json();

  return new Result<SummerCampPromoSetting[]>({
    ...response,
    data: response.promos ?? [],
    statusCode: result.status,
  })
}

export async function updateSummerCampPromoSettings(token: string) {

}

export async function getVacationCampSchedulesSettings(token: string) {
  let result = await fetch(
    process.env.NEXT_PUBLIC_API_ADMIN_URL! + `/vacation_camp_schedule_settings/edit-all`,
    { ...authHeaders(token) }
  );

  let response = await result.json();

  return new Result<VacationCampSetting[]>({
    ...response,
    data: response.vacation_camp ?? [],
    statusCode: result.status,
  })
}

export async function updateVacationCampScheduleSetting(formData: FormData, token: string) {
  let result = await fetch(
    process.env.NEXT_PUBLIC_API_ADMIN_URL! + `/vacation_camp_schedule_settings/update-all`,
    {
      method: 'POST',
      body: formData,
      headers: {
        Authorization: `Bearer ${token!}`,
      }
    }
  );

  try {
    let response = await result.json();

    return new Result<VacationCampSetting[]>({
      ...response,
      data: response.vacation_camp ?? undefined,
      statusCode: result.status,
      message: response.message ?? result.statusText
    })
  }
  catch (error) {
    return new Result<VacationCampSetting[]>({
      response: undefined,
      message: result.statusText,
      error: result.statusText,
      statusCode: result.status,
    })
  }
}

export async function getBeforeOrAfterSchoolSettings(token: string, cycleYear: string) {
  let result = await fetch(
    process.env.NEXT_PUBLIC_API_ADMIN_URL! + `/master_after_school_prices/edit-all?year_cycle=${cycleYear}`,
    { ...authHeaders(token) }
  );

  let response = await result.json();

  return new Result<BeforeOrAfterSchoolSetting[]>({
    response: response,
    data: response.master_prices ?? [],
    statusCode: result.status,
  })
}

export async function updateBeforeOrAfterSchoolSettings(formData: FormData, token: string) {
  let result = await fetch(
    process.env.NEXT_PUBLIC_API_ADMIN_URL! + `/master_after_school_prices/update-all`,
    {
      method: 'POST',
      body: formData,
      headers: {
        Authorization: `Bearer ${token!}`,
      }
    }
  );

  try {
    let response = await result.json();

    return new Result<BeforeOrAfterSchoolSetting[]>({
      ...response,
      data: response.vacation_camp ?? undefined,
      statusCode: result.status,
      message: response.message ?? result.statusText
    })
  }
  catch (error) {
    return new Result<BeforeOrAfterSchoolSetting[]>({
      response: undefined,
      message: result.statusText,
      error: result.statusText,
      statusCode: result.status,
    })
  }
}