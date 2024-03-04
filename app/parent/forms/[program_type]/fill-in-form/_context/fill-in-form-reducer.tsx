import { fillInFormInitState, initChildren } from "./fill-in-form-provider";

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

        return {
          ...state,
          fillInForm: {
            ...state.fillInForm,
            children: children
          }
        }
      }
    case 'RESET_FORM': {
      return { ...state, ...fillInFormInitState }
    }
    default:
      return state;
  }
}
