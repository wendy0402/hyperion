import React, {Component} from 'react'
import classNames from 'classnames'
export default class SaveForm extends Component{
  constructor(props){
    super(props);
    this.state = {
      newCollection: false
    }

    this.deactivate = this.deactivate.bind(this);
    this.createNewCollection = this.createNewCollection.bind(this);
    this.useExistingCollection = this.useExistingCollection.bind(this);
  }
  deactivate(e){
    e.preventDefault();
    this.props.deactivate();
  }

  createNewCollection(){
    this.setState({newCollection: true})
  }

  useExistingCollection(){
    this.setState({newCollection: false})
  }

  collectionInput(){
    if(this.state.newCollection){
      return(
        <p className="control">
          <input className="input" type="text" name="newCollection" placeholder="new collection"/>
          <br/>
          &nbsp;<a href="#" onClick={this.useExistingCollection}>use existing collection</a>
        </p>
      );
    } else{
      return(
        <p className="control">
          <span className="select">
            <select>
              <option>Select dropdown</option>
              <option>With options</option>
            </select>
          </span>
          <br/>
          &nbsp;<a href="#" onClick={this.createNewCollection}>create new collection</a>
        </p>
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
            <button className="delete" onClick={this.deactivate}></button>
          </header>

          <section className="modal-card-body">
            <form>
              <label className="label">Collection</label>
              {this.collectionInput()}
              <label className="label">Name</label>
              <p className="control">
                <input className="input" type="text" name="name" placeholder="Name"/>
              </p>
            </form>
          </section>

          <footer className="modal-card-foot">
            <a className="button is-primary">Save</a>
            <a className="button" onClick={this.deactivate}>Cancel</a>
          </footer>
        </div>
      </div>
    );
  }
}
