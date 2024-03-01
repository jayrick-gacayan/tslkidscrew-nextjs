export const fillInFormReducer = (state: any, action: { type: any; payload: any; }) => {
  switch (action.type) {
    case 'STRIPE_MODAL_TOGGLE':
      return {
        ...state,
        stripeModalOpen: !state.stripeModalOpen
      };
    case 'SET_NUMBER_OF_CHILD':
      return {
        ...state,
        numberOfChildren: action.payload
      }
    default:
      return state;
  }
}
