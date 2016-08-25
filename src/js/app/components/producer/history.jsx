import React, { Component } from 'react'
export default class History extends Component{
  render(){
    return(
      <aside className="menu">
        <ul className="menu-list">
          <p className="menu-label">20 August</p>

          <li><a href="#">localhost:9091 - test ...</a></li>
          <li><a href="#">localhost:9091</a></li>
        </ul>
      </aside>
    );
  }
}
