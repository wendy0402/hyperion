import React, { Component } from 'react'
export default class Collection extends Component{
  constructor(props){
    super(props);
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
  renderCollection(){
    this.props.collection.each((item) => {

    })
  }

  render(){
    return(
      <aside className="menu">
        <ul className="menu-list">
          <li>
            <a className="is-active" href="#">Manage Your Team</a>
            <ul>
              <li><a href="#">Members</a></li>
              <li><a href="#">Plugins</a></li>
              <li><a href="#">Add a member</a></li>
            </ul>
          </li>
        </ul>
      </aside>
    );
  }
}
