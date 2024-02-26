export const adminUserReducer = (state: any, action: { type: any; payload: any; }) => {
  switch (action.type) {
    case 'modalOpen':
      return {
        ...state,
        modal: { ...state.modal, open: action.payload }
      };
    case 'modalType':
      return {
        ...state,
        modal: { ...state.modal, type: action.payload }
      };
    case 'setData':
      return {
        ...state,
        data: action.payload
      }
    default: return state;
  }
}
