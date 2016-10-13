import React, { Component } from 'react'
import CodeTextArea from './code_text_area'
import { ProducerConst } from '../../constants/producer_const'
import * as Action from '../../actions/producer_form_action'
import {openSaveForm} from '../../actions/producer_save_form'
import {connect} from 'react-redux'
class Form extends Component{
  constructor(props){
    super(props)
    this.updateForm = this.updateForm.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.resetForm  = this.resetForm.bind(this);
    this.openSaveForm = this.openSaveForm.bind(this);
  }

  updateForm(e){
    this.props.dispatch(Action.updateProducerForm({[e.target.name]: e.target.value}));
  }

  submitForm(e){
    e.preventDefault();
    this.props.dispatch(Action.sendMessage({
      url: props.url,
      topic: props.topic,
      partition: props.partition,
      message: props.message
    }));
  }

  resetForm(e){
    e.preventDefault();
    this.props.dispatch(Action.updateProducerForm({
      url: '',
      topic: '',
      message: '',
      partition: 0,
      status: ProducerConst.form.status.idle
    }));
  }

  openSaveForm(e){
    e.preventDefault();
    this.props.dispatch(openSaveForm());
  }

  render(){
    return(
      <form onSubmit={this.submitForm}>
        <p className="control">
          <input className="input" type="text" name="url" placeholder="Enter kafka URL here" onChange={this.updateForm} value={this.props.url}/>
        </p>
        <div className="control is-horizontal">
          <div className="control is-grouped">
            <p className="control is-expanded">
              <input className="input" type="text" name="topic" placeholder="Topic" onChange={this.updateForm} value={this.props.topic}/>
            </p>
            <p className="control">
              <input className="input" type="number" name="partition" placeholder="Partition" onChange={this.updateForm} value={this.props.partition}/>
            </p>
          </div>
        </div>

        <div className="control">
          <CodeTextArea codemirrorId="codemirror-text" textAreaName="message" className="textarea"  onChange={this.updateForm} value={this.props.message}/>
        </div>
        <div className="control">
            <button className="button is-primary" type="submit" disabled={this.props.isSending}>{this.props.status === 'sending' ? 'Sending...' : 'Send'}</button>
            <button className="button is-danger" onClick={this.resetForm} disabled={this.props.isSending}>Reset</button>
            <button className="button is-info" onClick={this.openSaveForm}>Save</button>
        </div>
      </form>
    );
  }
}
export default connect((state) => {
  return {
    url: state.producerForm.url,
    topic: state.producerForm.topic,
    partition: state.producerForm.partition,
    message: state.producerForm.message,
    status: state.producerForm.status
  }
})(Form);
