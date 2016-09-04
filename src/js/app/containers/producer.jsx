import React, { Component } from 'react'
import History from '../components/producer/history'
import Form from '../components/producer/form'
import Result from '../components/producer/result'
import SubNav from '../components/producer/sub_nav'
import SaveForm from '../components/producer/save_form'

import {updateProducerForm, sendMessage, sendingMessageOnProgress, finishSendMessage } from '../actions/producer_form_action'
import {
  openSaveForm,
  closeSaveForm,
  createCollection,
  useNewCollectionField,
  useExistingCollectionField,
  updateSaveFormField,
  createCollectionWithTemplate
} from '../actions/producer_save_form'

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
          <SubNav subRoute={this.props.subRoute}>
            <History histories={this.props.histories} onClickHistory={this.props.updateForm} subRouteName={ProducerConst.subRoute.history}/>
          </SubNav>
        </div>
        <div className="column is-6 is-container-vertical-scrollable">
          <div className= "content">
            <p className="subtitle is-5">&nbsp;</p> {/* this is for title*/}
            <Form
              onChange={this.props.updateForm}
              params={this.props.producerForm}
              onSubmit={this.props.sendForm}
              isSending={this.props.producerForm.status === 'sending'}
              onClickSave={this.props.openSaveForm}
            />
          </div>
          {this.renderResultMessage()}
        </div>
        <SaveForm
          active={this.props.saveForm.active}
          form={this.props.saveForm.form}
          newCollection={this.props.saveForm.newCollection}

          deactivate={this.props.closeSaveForm}
          templateCollections={this.props.saveForm.templateCollections}
          useNewCollectionField={this.props.useNewCollectionField}
          useExistingCollectionField={this.props.useExistingCollectionField}
          updateSaveFormField={this.props.updateSaveFormField}
          createNewCollection={this.props.createCollectionWithTemplate}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    producerForm: state.producerForm,
    histories: state.producerHistory.histories,
    subRoute: state.producerRoute.subRoute,
    saveForm: state.producerSaveForm
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateForm:               (params)  => { dispatch(updateProducerForm(params)) },
    sendForm:                 (params)  => { dispatch(sendMessage(params)) },
    //
    openSaveForm:               ()        => { dispatch(openSaveForm()) },
    closeSaveForm:              ()        => { dispatch(closeSaveForm()) },
    useNewCollectionField:      ()        => { dispatch(useNewCollectionField()) },
    useExistingCollectionField: ()        => { dispatch(useExistingCollectionField()) },
    updateSaveFormField:        (params)  => { dispatch(updateSaveFormField(params)) },
    createCollectionWithTemplate: (CollectionName, TemplateName) => {
      dispatch(createCollectionWithTemplate(CollectionName, TemplateName))
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Producer);
