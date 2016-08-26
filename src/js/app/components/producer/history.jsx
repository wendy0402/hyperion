import React, { Component } from 'react'
export default class History extends Component{
  constructor(props){
    super(props);
    this._renderHistories = this._renderHistories.bind(this);
  }
  _renderHistories(){
    let histories = this.props.histories;
    return Object.keys(histories).map((id) => {
      let history = histories[id];
      return(
        <li key={id}>
          <a href="#">{`${history.url}/${history.topic}/${history.partition}`}</a>
        </li>
      );
    })
  }
  render(){
    return(
      <aside className="menu">
        <ul className="menu-list">
          {this._renderHistories()}
        </ul>
      </aside>
    );
  }
}
