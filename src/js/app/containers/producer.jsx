import React, { Component } from 'react'
import {bindActionCreators} from 'redux'
import { connect } from 'react-redux'
import { ProducerConst } from '../constants/producer_const'

import Form from '../components/producer/form'
import Result from '../components/producer/result'

import SaveForm from '../components/producer/save_form'
import SideMenuRouter from '../components/producer/side_menu_router'

import * as ProducerFormAction from '../actions/producer_form_action'
import * as ProducerSaveFormAction from '../actions/producer_save_form'

import { initializeHistory } from '../actions/producer_history'


class Producer extends Component{
  constructor(props){
    super(props);
    this.renderResultMessage = this.renderResultMessage.bind(this);
    // container logic
    this.createCollectionSaveForm = this.createCollectionSaveForm.bind(this);
    this.addTemplateSaveForm    = this.addTemplateSaveForm.bind(this);
    // action
    this.producerSaveFormAction       = bindActionCreators(ProducerSaveFormAction, props.dispatch);
    this.producerFormAction           = bindActionCreators(ProducerFormAction, props.dispatch);
  }

  // container logic
  createCollectionSaveForm(collectionName, templateName){
    let templateParams = {
      name: templateName,
      url: this.props.producerForm.url,
      topic: this.props.producerForm.topic,
      message: this.props.producerForm.message,
      partition: this.props.producerForm.partition
    }

    this.producerSaveFormAction.createCollectionWithTemplate(collectionName, templateParams)
  }

  addTemplateSaveForm(collectionID, templateName) {
    let templateParams = {
      name: templateName,
      url: this.props.producerForm.url,
      topic: this.props.producerForm.topic,
      message: this.props.producerForm.message,
      partition: this.props.producerForm.partition
    }

    this.producerSaveFormAction.addTemplateToCollection(collectionID, templateParams)
  }
  // container logic

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
          <SideMenuRouter/>
        </div>
        <div className="column is-6 is-container-vertical-scrollable">
          <div className= "content">
            <p className="subtitle is-5">&nbsp;</p> {/* this is for title*/}
            <Form />
          </div>
          {this.renderResultMessage()}
        </div>
        <SaveForm
          active={this.props.saveForm.active}
          form={this.props.saveForm.form}
          newCollection={this.props.saveForm.newCollection}
          actions={this.producerSaveFormAction}

          templateCollections={this.props.collections.templateCollections}
          createNewCollection={this.createCollectionSaveForm}
          addTemplateToCollection={this.addTemplateSaveForm}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    producerForm: state.producerForm,
    saveForm: state.producerSaveForm,
    collections: state.producerCollection
  };
}

export default connect(
  mapStateToProps
)(Producer);
