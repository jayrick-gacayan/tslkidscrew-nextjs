import { RequestStatus } from "@/types/enums/request-status";
import { InputProps } from "@/types/props/input-props";

export interface AdminSettingsState {
  summerCampWeekSetting: {
    name: InputProps<string>;
    startDate?: string | null
    capacity: InputProps<string>;
    notes: string;
    week: string;
    requestStatus: RequestStatus;
    enabled: boolean
  }
}