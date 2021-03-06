import React, { Component } from 'react'
export default class History extends Component{
  constructor(props){
    super(props);
    this._renderHistories = this._renderHistories.bind(this);
    this.onClickHistory = this.onClickHistory.bind(this)
  }

  componentDidMount(){
    this.props.onActive();
  }

  onClickHistory(e){
    e.preventDefault();
    let id = e.target.dataset.id
    let history = this.props.histories[id];
    if(typeof history === "object") {
      this.props.onClickHistory({
        url: history.url,
        topic: history.topic,
        partition: history.partition,
        message: history.message
      });
    }
  }

  _renderHistories(){
    let histories = this.props.histories;
    return Object.keys(histories).map((id) => {
      let history = histories[id];
      return(
        <li key={id} onClick={this.onClickHistory}>
          <a href="#"  data-id={id}>{`${history.url}/${history.topic}/${history.partition}`}</a>
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
