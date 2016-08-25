import { SEND_MESSAGE, FINISH_SEND_MESSAGE, UPDATE_PRODUCER_FORM } from '../constants/action_types'

const initialState = {
  title: null,
  topic: '',
  partition: 0,
  message: '',
  url: '',
  status: 'idle', //options idle, sending
  result: '', // e.g: success, failed
  resultMessage: ''
}

export default function producerForm(state= initialState, action){
  switch(action.type){
    case UPDATE_PRODUCER_FORM:
      return Object.assign({}, state, action.params);
    case SEND_MESSAGE:
      return Object.assign({}, state, {
        status: 'sending'
      });
    case FINISH_SEND_MESSAGE:
      return Object.assign({}, state, {
        status: 'sent',
        result: action.result,
        resultMessage: action.resultMessage
      });
    default:
      return state;
  }
}
