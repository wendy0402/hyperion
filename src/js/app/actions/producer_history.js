import { UPDATE_HISTORIES } from '../constants/action_types'

import { History } from '../model/history'
import { arrayModelToObj } from '../util'
export function initializeHistory(){
  return (dispatch) => { fetchAllHistories(dispatch) }
}

export function addHistory(params){
  return (dispatch) =>{
    History.add(params, (id) => { fetchAllHistories(dispatch) });
  };
}

function fetchAllHistories(dispatch){
  return History.fetchAll((histories) => {
    dispatch(_updateHistory(histories))
  });
}

function _updateHistory(histories=[]){
  return {
    type: UPDATE_HISTORIES,
    histories: arrayModelToObj(histories)
  }
}
