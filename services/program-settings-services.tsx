import { BeforeOrAfterSchoolSetting } from '@/models/before-or-after-school-setting';
import { ProgramYearCycleSetting } from '@/models/program-year-cycle-setting';
import { Result } from '@/models/result';
import { SummerCampPromoSetting } from '@/models/summer-camp-promo-setting';
import { SummerCampSwimSetting } from '@/models/summer-camp-swim-setting';
import { SummerCampWeekSetting } from '@/models/summer-camp-week-setting';
import { VacationCampSetting } from '@/models/vacation-camp-setting';
import { authHeaders } from '@/types/helpers/auth-headers';
import { ProgramYearCycleSettingInputTypes } from '@/types/input-types/program-year-cycle-setting-input-types';
import { SummerCampSwimSettingInputTypes } from '@/types/input-types/summer-camp-swim-setting-input-types';

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
      method: 'PUT',
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

  try {
    let response = await result.json();

    return new Result<SummerCampWeekSetting[]>({
      ...response,
      data: response.week_settings ?? [],
      statusCode: result.status,
    })
  } catch (error) {
    return new Result<SummerCampWeekSetting[]>({
      response: undefined,
      error: result.statusText,
      statusCode: result.status,
    })
  }
}

export async function updateSummerCampWeekSetting(
  formData: FormData,
  token: string
) {

  let result = await fetch(
    process.env.NEXT_PUBLIC_API_ADMIN_URL! + `/summer_camp_week_settings/update`,
    {
      method: 'PATCH',
      body: formData,
      headers: {
        Authorization: `Bearer ${token!}`
      }
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

  try {
    let response = await result.json();

    return new Result<SummerCampPromoSetting[]>({
      ...response,
      data: response.promos ?? [],
      statusCode: result.status,
    })
  } catch (error) {
    return new Result<SummerCampPromoSetting[]>({
      message: result.statusText,
      error: result.statusText,
      statusCode: result.status,
      response: undefined,
    })
  }

}

export async function updateSummerCampPromoSettings(
  {
    id,
    name,
    child_record_count,
    week_count,
    price,
    with_swim_trip,
  }: {
    id: number;
    name: string;
    child_record_count: string;
    week_count: string;
    price: number;
    with_swim_trip: string;
  }, token: string) {
  let result = await fetch(
    process.env.NEXT_PUBLIC_API_ADMIN_URL! + `/summer_camp_promos/update-all`,
    {
      method: 'PATCH',
      body: JSON.stringify({
        summer_camp_promo: {
          id,
          name,
          child_record_count,
          week_count,
          price,
          with_swim_trip
        }
      }),
      ...authHeaders(token)
    }
  );

  try {
    let response = await result.json();

    return new Result<SummerCampPromoSetting>({
      response: response,
      data: response.summer_camp_promos ?? undefined,
      message: result.statusText,
      statusCode: result.status,
    })
  } catch (error) {
    return new Result<SummerCampPromoSetting>({
      response: undefined,
      message: result.statusText,
      statusCode: result.status,
      error: result.statusText
    })
  }

}

export async function getVacationCampSchedulesSettings(token: string) {
  let result = await fetch(
    process.env.NEXT_PUBLIC_API_ADMIN_URL! + `/vacation_camp_schedule_settings/edit-all`,
    { ...authHeaders(token) }
  );

  try {
    let response = await result.json();

    return new Result<VacationCampSetting[]>({
      ...response,
      data: response.vacation_camp ?? [],
      statusCode: result.status,
    })
  } catch (error) {
    return new Result<VacationCampSetting[]>({
      message: result.statusText,
      error: result.statusText,
      statusCode: result.status,
      response: undefined,
    })
  }
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

  try {
    let response = await result.json();
    return new Result<BeforeOrAfterSchoolSetting[]>({
      response: response,
      data: response.master_prices ?? [],
      statusCode: result.status,
    })
  } catch (error) {
    return new Result<BeforeOrAfterSchoolSetting[]>({
      message: result.statusText,
      error: result.statusText,
      statusCode: result.status,
      response: undefined,
    })
  }

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

export async function getProgramSettingYearCycleForRegRecord(location_id: string, token: string) {
  let result = await fetch(
    process.env.NEXT_PUBLIC_API_PARENT_URL! + `/data/before_and_after_school_availability?location_id=${encodeURIComponent(location_id)}`,
    {
      ...authHeaders(token)
    });

  try {
    let response = await result.json();

    let { year_cycle, ...rest } = response;

    return new Result<ProgramYearCycleSetting & any>({
      response: response,
      data: { year_cycle, ...rest } ?? undefined,
      statusCode: result.status,
      message: result.statusText
    })

  } catch (error) {
    return new Result<ProgramYearCycleSetting & any>({
      response: undefined,
      statusCode: result.status,
      message: result.statusText,
      error: result.statusText
    })
  }
}

export async function getSummerCampWeeksForRegular(location_id: string, token: string) {
  let result = await fetch(
    process.env.NEXT_PUBLIC_API_PARENT_URL! + `/data/get_summer_camp_weeks?location_id=${encodeURIComponent(location_id)}`,
    {
      ...authHeaders(token)
    });

  try {
    let response = await result.json();

    if (result.status === 200) {
      return new Result<Partial<SummerCampWeekSetting>[]>({
        response: response,
        data: response.summer_camp_weeks,
        statusCode: result.status,
        message: result.statusText
      })
    }

    return new Result<Partial<SummerCampWeekSetting>[]>({
      response: response,
      message: response.message ?? result.statusText,
      statusCode: result.status,
    })

  } catch (error) {
    return new Result<Partial<SummerCampWeekSetting>[]>({
      response: undefined,
      statusCode: result.status,
      message: result.statusText,
      error: result.statusText
    })
  }
}

export async function getSummerCampPromosForCreateRegRecord(token: string) {
  let result = await fetch(
    process.env.NEXT_PUBLIC_API_PARENT_URL! + `/data/get_all_summer_camp_promo`,
    {
      ...authHeaders(token),
      next: { tags: ['summer-camp-promo-create-reg-record'] }
    });


  try {
    let response = await result.json();

    if (result.status === 200) {
      return new Result<SummerCampPromoSetting[]>({
        response: response,
        data: response.promos,
        statusCode: result.status,
        message: result.statusText
      })
    }

    return new Result<SummerCampPromoSetting[]>({
      response: response,
      message: response.message ?? result.statusText,
      statusCode: result.status,
    })

  } catch (error) {
    return new Result<SummerCampPromoSetting[]>({
      response: undefined,
      statusCode: result.status,
      message: result.statusText,
      error: result.statusText
    })
  }
}

export async function getVacationCampsForCreateRegRecord(location_id: string, token: string) {
  let result = await fetch(
    process.env.NEXT_PUBLIC_API_PARENT_URL! + `/data/get_vacation_camp_schedules?location_id=${encodeURIComponent(location_id)}`,
    { ...authHeaders(token) }
  );

  try {
    let response = await result.json();

    if (result.status === 200) {
      return new Result<Partial<VacationCampSetting>[]>({
        response: response,
        data: response.vacation_camp_schedules,
        statusCode: result.status,
        message: result.statusText
      })
    }

    return new Result<Partial<VacationCampSetting>[]>({
      response: response,
      message: response.message ?? result.statusText,
      statusCode: result.status,
    })

  } catch (error) {
    return new Result<Partial<SummerCampWeekSetting>[]>({
      response: undefined,
      statusCode: result.status,
      message: result.statusText,
      error: result.statusText
    })
  }
}

export async function getSummerCampWeeksForPromo(token: string) {
  let result = await fetch(
    process.env.NEXT_PUBLIC_API_PARENT_URL! + `/summer_camp_week_settings`,
    { ...authHeaders(token) }
  );

  try {
    let response = await result.json();

    if (result.status === 200) {
      return new Result<Partial<SummerCampWeekSetting>[]>({
        response: response,
        data: response.week_settings,
        statusCode: result.status,
        message: result.statusText
      })
    }

    return new Result<Partial<SummerCampWeekSetting>[]>({
      response: response,
      message: response.message ?? result.statusText,
      statusCode: result.status,
    })

  } catch (error) {
    return new Result<Partial<SummerCampWeekSetting>[]>({
      response: undefined,
      statusCode: result.status,
      message: result.statusText,
      error: result.statusText
    })
  }
}

