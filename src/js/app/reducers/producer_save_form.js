import { CLOSE_SAVE_FORM, OPEN_SAVE_FORM } from '../constants/action_types'
const initialState = {
  active: false
}
export default function producerSaveForm(state=initialState, action){
  switch(action.type){
    case OPEN_SAVE_FORM:
      return Object.assign({}, state, {
        active: true
      });
    case CLOSE_SAVE_FORM:
      return Object.assign({}, state, {
        active: false
      });
    default:
    return state;
  }
}
