import { SEND_MESSAGE, FINISH_SEND_MESSAGE, UPDATE_PRODUCER_FORM } from '../constants/action_types'
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
  return (dispatch) => {
    dispatch(sendingMessageOnProgress()); // message on progress

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
      let successMessage = `success with topic ${result[0].topic} offset ${result[0].offset}`
      return dispatch(finishSendMessage(
        { result: 'success', resultMessage: successMessage }
      ));
    })
    .catch((e) =>{
      producer.end();
      console.error(e);
      return dispatch(finishSendMessage({result: 'failed', resultMessage: e.message}));
    });
  };
}

export function sendingMessageOnProgress(){
  return {
    type: SEND_MESSAGE,
  }
}

export function finishSendMessage(params){ //success true or false
  return {
    type: FINISH_SEND_MESSAGE,
    status: 'sent',
    resultMessage: params.resultMessage,
    result: params.result
  }
}
