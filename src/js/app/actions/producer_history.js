import { INIT_HISTORY, ADD_HISTORY } from '../constants/action_types'

import { History } from '../model/history'

export function initializeHistory(){
  return (dispatch) => {
    History.fetchAll((histories) => {
      dispatch(_initHistory(histories))
    });
  }
}

export function addHistory(params){
  return (dispatch) =>{
    History.add(params, (id) => {
      return dispatch({
        type: ADD_HISTORY,
        history: Object.assign({}, params, {id: id})
      });
    });
  };
}

function _initHistory(histories){
  return {
    type: INIT_HISTORY,
    histories: histories
  }
}
