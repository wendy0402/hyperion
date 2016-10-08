import React, {Component} from 'react'
import classNames from 'classnames'
import { ProducerConst } from '../../constants/producer_const'
export default class SaveForm extends Component{
  constructor(props){
    super(props);
    this.state = {
      newCollection: false
    }

    this.deactivate = this.deactivate.bind(this);
    this.useNewCollectionField = this.useNewCollectionField.bind(this);
    this.useExistingCollection = this.useExistingCollection.bind(this);
    this.updateSaveFormField = this.updateSaveFormField.bind(this);
    this.save = this.save.bind(this);
    this.flashMessage = this.flashMessage.bind(this);
  }
  deactivate(e){
    e.preventDefault();
    this.props.actions.closeSaveForm();
  }

  useNewCollectionField(e){
    e.preventDefault();
    this.props.actions.useNewCollectionField();
    this.props.actions.updateSaveFormField({selectedCollection: ""})
  }

  useExistingCollection(e){
    e.preventDefault();
    this.props.actions.useExistingCollectionField();
    this.props.actions.updateSaveFormField({newCollectionName: ""})
  }

  updateSaveFormField(e){
    e.preventDefault();
    this.props.actions.updateSaveFormField({[e.target.name]: e.target.value})
  }

  save(e){
    e.preventDefault();
    if(this.props.newCollection){
      this.props.createNewCollection(this.props.form.newCollectionName, this.props.form.templateName);
    } else{
      this.props.actions.addTemplateToCollection(this.props.form.selectedCollection, this.props.form.templateName);
    }
  }

  collectionInput(){
    if(this.props.newCollection){
      return(
        <p className="control">
          <input className="input" type="text" name="newCollectionName" placeholder="new collection" value={this.props.form.newCollectionName} onChange={this.updateSaveFormField}/>
          <br/>
          &nbsp;<a href="#" onClick={this.useExistingCollection}>use existing collection</a>
        </p>
      );
    } else{
      let templateCollections = this.props.templateCollections
      let collectionNameOptions = Object.keys(templateCollections).map((id) => {
        return(<option value={id} key={id}>{templateCollections[id].name}</option>)
      });

      collectionNameOptions.unshift(<option value="" key=""></option>);
      return(
        <p className="control">
          <span className="select">
            <select value={this.props.form.selectedCollection} onChange={this.updateSaveFormField} name="selectedCollection">
              {collectionNameOptions}
            </select>
          </span>
          <br/>
          &nbsp;<a href="#" onClick={this.useNewCollectionField}>create new collection</a>
        </p>
      );
    }
  }

  flashMessage(){
    if(this.props.form.result === ProducerConst.saveForm.result['failed']){
      return(
        <article className="message is-danger">
          <div className="message-body">
            {this.props.form.resultMessage}
          </div>
        </article>
      );
    }
  }

  render(){
    let modalClassName = classNames({
      'modal': true,
      'is-active': this.props.active
    });

    return(
      <div className={modalClassName}>
        <div className="modal-background" onClick={this.deactivate}></div>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">Save Template</p>
            <button className="delete" onClick={this.props.actions.closeSaveForm}></button>
          </header>

          <section className="modal-card-body">
            {this.flashMessage()}
            <div>
              <label className="label">Collection</label>
              {this.collectionInput()}
              <label className="label">Name</label>
              <p className="control">
                <input className="input" type="text" name="templateName" placeholder="Template Name" value={this.props.form.templateName} onChange={this.updateSaveFormField}/>
              </p>
            </div>
          </section>

          <footer className="modal-card-foot">
            <a className="button is-primary" onClick={this.save}>Save</a>
            <a className="button" onClick={this.deactivate}>Cancel</a>
          </footer>
        </div>
      </div>
    );
  }
}
