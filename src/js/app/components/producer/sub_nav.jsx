import React, { Component } from 'react'
import {bindActionCreators} from 'redux'
import History from './history'
import classNames from 'classnames'
import { ProducerConst } from '../../constants/producer_const'
import * as ProducerRoute from '../../actions/producer_route'

export default class SubNav extends Component{
  constructor(props){
    super(props);
    this.currentSubRoute = this.currentSubRoute.bind(this);
    this.childrenNodes = this.childrenNodes.bind(this);
    this.renderNavLink = this.renderNavLink.bind(this);
    this.actions = bindActionCreators(ProducerRoute, this.props.dispatch);

  }

  childrenNodes(){
    return Array.isArray(this.props.children) ? this.props.children : [this.props.children];
  }

  currentSubRoute(){
    var currentSubNode = null;

    for(const childNode of this.childrenNodes()) {
      if(childNode.props.subRouteName === this.props.subRoute){
        currentSubNode = childNode;
        break;
      }
    }
    return currentSubNode
  }

  renderNavLink(){
    return this.childrenNodes().map((childNode) => {
      let subRouteName = childNode.props.subRouteName;
      let liClassName = classNames({
        "is-active": this.props.subRoute === subRouteName
      });
      let onClick = (e) => {
        e.preventDefault();
        this.props.changeProducerSubRoute(subRouteName);
      };

      return (<li key={subRouteName} className={liClassName} onClick={onClick}><a>{childNode.props.subNavName}</a></li>);
    });
  }
  render(){
    return(
      <div>
        <div className="tabs">
          <ul>
            {this.renderNavLink()}
          </ul>
        </div>
        {this.currentSubRoute()}
      </div>
    );
  }
}
