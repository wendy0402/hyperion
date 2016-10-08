import {CHANGE_SUBROUTE} from '../constants/action_types'
const initialState = {
  subRoute: 'collection'
}
export default function producerRoute(state=initialState, action){
  switch(action.type){
    case CHANGE_SUBROUTE:
      return Object.assign({}, state, {
        subRoute: action.subRoute
      });
    default:
      return state;
  }

}
