import { UPDATE_HISTORIES } from '../constants/action_types'
window.History = History;
const initialState = {
  histories: {} // e.g: { 1: { url: 'localhost:9091', topic: 'test', partition: 0, message: 'test only' } }
}

export default function producerHistory(state= initialState, action){
  switch(action.type){
    case UPDATE_HISTORIES:
      return Object.assign({}, state, {
        histories: action.histories
      });
    default:
      return state;
  }
}
