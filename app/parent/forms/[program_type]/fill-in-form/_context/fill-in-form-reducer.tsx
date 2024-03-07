import { fillInFormInitState, initChildren } from "./fill-in-form-provider";
import { ValidationType } from "@/types/enums/validation-type";

export const fillInFormReducer = (state: any, action: { type: any; payload: any; }) => {
  switch (action.type) {
    case 'STRIPE_MODAL_TOGGLE':
      return {
        ...state,
        stripeModalOpen: !state.stripeModalOpen
      };
    case 'SET_LOCATION':
      return {
        ...state,
        fillInForm: {
          ...state.fillInForm,
          location: action.payload
        }
      }
    case 'ADD_CHILDREN':
      return {
        ...state,
        fillInForm: {
          ...state.fillInForm,
          children: [...state.fillInForm.children, initChildren]
        }
      }
    case 'REMOVE_CHILDREN': {
      return {
        ...state,
        fillInForm: {
          ...state.fillInForm,
          children: state.fillInForm.children.filter((val: any, idx: number) => {
            return idx !== action.payload
          })
        }
      }
    }
    case 'CHANGE_FIRST_NAME':
      {
        let children = state.fillInForm.children;

        children[action.payload.idx] = {
          ...children[action.payload.idx],
          first_name: action.payload.value,
        }

        return {
          ...state,
          fillInForm: {
            ...state.fillInForm,
            children: children
          }
        }
      }
    case 'CHANGE_LAST_NAME':
      {
        let children = state.fillInForm.children;

        children[action.payload.idx] = {
          ...children[action.payload.idx],
          last_name: action.payload.value,
        }

        return {
          ...state,
          fillInForm: {
            ...state.fillInForm,
            children: children
          }
        }
      }
    case 'CHANGE_SCHOOL_ATTENDING':
      {
        let children = state.fillInForm.children;

        children[action.payload.idx] = {
          ...children[action.payload.idx],
          school_attending: action.payload.value,
        }

        return {
          ...state,
          fillInForm: {
            ...state.fillInForm,
            children: children
          }
        }
      }
    case 'CHANGE_BIRTHDATE':
      {
        let children = state.fillInForm.children;

        children[action.payload.idx] = {
          ...children[action.payload.idx],
          birthdate: action.payload.value,
        }

        return
      }
    case 'RESET_FORM': {
      return { ...state, ...fillInFormInitState }
    }
    case 'SET_TOS_ERROR': {
      return {
        ...state, fillInForm: {
          ...state.fillInForm,
          TOSCheckError: action.payload
        }
      }
    }

    // for program type before-or-after-school
    case 'SET_YEAR_CYCLE': {
      return {
        ...state,
        fillInForm: {
          ...state.fillInForm,
          yearCycle: action.payload
        }
      }
    }
    case 'SET_WEEK_DAY_BOAS': {
      let { type, value } = action.payload
      return {
        ...state,
        fillInForm: {
          ...state.fillInForm,
          beforeOrAfterWeekDays: {
            value: {
              ...state.fillInForm.beforeOrAfterWeekDays.value,
              [`${type}`]:
                state.fillInForm.beforeOrAfterWeekDays.value[`${type}`].includes(value) ?
                  state.fillInForm.beforeOrAfterWeekDays.value[`${type}`].filter((val: any) => {
                    return val !== value
                  }) :
                  [...state.fillInForm.beforeOrAfterWeekDays.value[`${type}`], value]
            },
            errorText: '',
            validationStatus: ValidationType.NONE
          },

        }
      }
    }
    case 'SET_WEEK_DAY_BOAS_ERROR': {
      let { errorText, validationStatus } = action.payload
      return {
        ...state,
        fillInForm: {
          ...state.fillInForm,
          beforeOrAfterWeekDays: {
            ...state.fillInForm.beforeOrAfterWeekDays,
            errorText,
            validationStatus
          },
        }
      }
    }
    case 'SET_START_DATE': {
      return {
        ...state,
        fillInForm: {
          ...state.fillInForm,
          startDate: action.payload
        }
      }
    }

    default:
      return state;
  }
}
