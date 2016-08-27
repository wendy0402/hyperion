import React, { Component } from 'react'
import History from '../components/producer/history'
import Form from '../components/producer/form'
import Result from '../components/producer/result'
import {updateProducerForm, sendMessage, sendingMessageOnProgress, finishSendMessage } from '../actions/producer_form_action'
import { connect } from 'react-redux'
import { ProducerConst } from '../constants/producer_const'

class Producer extends Component{
  constructor(props){
    super(props);
    this.renderResultMessage = this.renderResultMessage.bind(this);
  }

  renderResultMessage(){
    if(this.props.producerForm.status === ProducerConst.form.status.sent){
      return(
        <Result result={this.props.producerForm.result} resultMessage={this.props.producerForm.resultMessage}/>
      );
    }
  }
  render(){
    return(
      <div className="columns">
        <div className="column is-4 is-container-vertical-scrollable">
          <div className="tabs">
            <ul>
              <li className="is-active"><a>History</a></li>
              <li><a>Collection</a></li>
            </ul>
          </div>
          <History histories={this.props.histories} onClickHistory={this.props.updateForm}/>
        </div>
        <div className="column is-6 is-container-vertical-scrollable">
          <div className="heading has-text-centered">
            <h2 className="subtitle">Producer</h2>
          </div>
          <div className= "content">
            <Form
              onChange={this.props.updateForm}
              params={this.props.producerForm}
              onSubmit={this.props.sendForm}
              isSending={this.props.producerForm.status === 'sending'}/>
          </div>
          {this.renderResultMessage()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    producerForm: state.producerForm,
    histories: state.producerHistory.histories
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateForm: (params) => { dispatch(updateProducerForm(params)); },
    sendForm: (params) => { dispatch(sendMessage(params))}
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Producer);
