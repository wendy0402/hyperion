import React, { Component } from 'react'
import CodeTextArea from './code_text_area'
import { ProducerConst } from '../../constants/producer_const'
export default class Form extends Component{
  constructor(props){
    super(props)
    this.updateForm = this.updateForm.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.resetForm  = this.resetForm.bind(this);
    this.openSaveForm = this.openSaveForm.bind(this);
  }

  updateForm(e){
    this.props.onChange({[e.target.name]: e.target.value});
  }

  submitForm(e){
    e.preventDefault();
    this.props.onSubmit(this.props.params);
  }

  resetForm(e){
    e.preventDefault();
    this.props.onChange({
      url: '',
      topic: '',
      message: '',
      partition: 0,
      status: ProducerConst.form.status.idle
    });
  }

  openSaveForm(e){
    e.preventDefault();
    this.props.onClickSave();
  }

  render(){
    return(
      <form onSubmit={this.submitForm}>
        <p className="control">
          <input className="input" type="text" name="url" placeholder="Enter kafka URL here" onChange={this.updateForm} value={this.props.params.url}/>
        </p>
        <div className="control is-horizontal">
          <div className="control is-grouped">
            <p className="control is-expanded">
              <input className="input" type="text" name="topic" placeholder="Topic" onChange={this.updateForm} value={this.props.params.topic}/>
            </p>
            <p className="control">
              <input className="input" type="number" name="partition" placeholder="Partition" onChange={this.updateForm} value={this.props.params.partition}/>
            </p>
          </div>
        </div>

        <div className="control">
          <CodeTextArea codemirrorId="codemirror-text" textAreaName="message" className="textarea"  onChange={this.updateForm} value={this.props.params.message}/>
        </div>
        <div className="control">
            <button className="button is-primary" type="submit" disabled={this.props.isSending}>{this.props.isSending ? 'Sending...' : 'Send'}</button>
            <button className="button is-danger" onClick={this.resetForm} disabled={this.props.isSending}>Reset</button>
            <button className="button is-info" onClick={this.openSaveForm}>Save</button>
        </div>
      </form>
    );
  }
}
