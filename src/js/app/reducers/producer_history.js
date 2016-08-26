import { INIT_HISTORY, ADD_HISTORY } from '../constants/action_types'
window.History = History;
const initialState = {
  histories: {} // e.g: { 1: { url: 'localhost:9091', topic: 'test', partition: 0, message: 'test only' } }
}

export default function producerHistory(state= initialState, action){
  switch(action.type){
    case INIT_HISTORY:
      let historiesObj = action.histories.reduce(function(histories, history, index) {
        histories[history.id] = history;
        return histories;
      }, {});
      return Object.assign({}, state, {
        histories: action.histories
      });

    case ADD_HISTORY:
      let newHistory = {}
      newHistory[action.history.id] = action.history
      let histories = Object.assign({}, state.histories, newHistory)
      return Object.assign({}, state, {
        histories: histories
      })
    default:
      return state;
  }
}
