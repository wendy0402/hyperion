import { SEND_MESSAGE, FINISH_SEND_MESSAGE, UPDATE_PRODUCER_FORM } from '../constants/action_types'
import { addHistory } from './producer_history'
import { ProducerConst } from '../constants/producer_const'
const kafka = window.nodeRequire('no-kafka');

export function updateProducerForm(params){
  return {
    type: UPDATE_PRODUCER_FORM,
    params
  }
}

// @TODO params validation
export function sendMessage(params){
  //code mirror use ↵ to replace newline
  params.message = params.message.replace(/↵/g, '\n');
  let producer = new kafka.Producer({connectionString: params.url});
  let partition = parseInt(params.partition);
  if(partition === NaN) { partition = 0};
  return (dispatch) => {
    let paramsPayload = {
      url: params.url,
      message: params.message,
      topic: params.topic,
      partition: partition
    }
    dispatch(sendingMessageOnProgress(paramsPayload)); // message on progress
    dispatch(addHistory(paramsPayload));
    producer.init()
    .then(() => {
      return producer.send({
        partition: params.partition,
        topic: params.topic,
        message: { value: params.message}
      })
    })
    .then((result) =>{
      producer.end();
      let sendingResult;
      if(result[0].error !== null && result[0].error !== undefined){
        sendingResult = {result: 'failed', resultMessage: result[0].error.message}
      } else{
        let successMessage = `success with topic ${result[0].topic} offset ${result[0].offset}`
        sendingResult = { result: 'success', resultMessage: successMessage }
      }
      return dispatch(finishSendMessage(sendingResult));
    })
    .catch((e) =>{
      producer.end();
      console.error(e);
      return dispatch(finishSendMessage({result: ProducerConst.form.result.failed, resultMessage: e.message}));
    });
  };
}

function sendingMessageOnProgress(params){
  return {
    type: SEND_MESSAGE,
    params
  }
}

function finishSendMessage(params){ //success true or false
  return {
    type: FINISH_SEND_MESSAGE,
    status: ProducerConst.form.status.sent,
    resultMessage: params.resultMessage,
    result: params.result
  }
}
