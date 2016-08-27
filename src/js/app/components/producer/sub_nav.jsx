import React, { Component } from 'react'
import History from './history'
import classNames from 'classnames'
import { ProducerConst } from '../../constants/producer_const'
export default class SubNav extends Component{
  constructor(props){
    super(props);
    this.historyClassName = this.historyClassName.bind(this);
    this.currentSubRoute = this.currentSubRoute.bind(this);
  }
  historyClassName(){
    return classNames({
      "is-active": this.props.subRoute === ProducerConst.subRoute.history
    });
  }

  currentSubRoute(){
    let childrenNode = Array.isArray(this.props.children) ? this.props.children : [this.props.children];
    var currentSubNode = null;

    for(const childNode of childrenNode) {
      if(childNode.props.subRouteName === this.props.subRoute){
        currentSubNode = childNode;
        break;
      }
    }
    return currentSubNode
  }
  render(){
    return(
      <div>
        <div className="tabs">
          <ul>
            <li className={this.historyClassName()}><a>History</a></li>
            <li><a>Collection</a></li>
          </ul>
        </div>
        {this.currentSubRoute()}
      </div>
    );
  }
}
