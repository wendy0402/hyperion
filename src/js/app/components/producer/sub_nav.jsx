import React, { Component } from 'react'
import {bindActionCreators} from 'redux'
import History from './history'
import classNames from 'classnames'
import { ProducerConst } from '../../constants/producer_const'

export default class SubNav extends Component{
  constructor(props){
    super(props);
    this.renderCurrentSubMenu = this.renderCurrentSubMenu.bind(this);
    this.childrenNodes = this.childrenNodes.bind(this);
    this.renderNavLink = this.renderNavLink.bind(this);
  }

  childrenNodes(){
    return Array.isArray(this.props.children) ? this.props.children : [this.props.children];
  }

  renderCurrentSubMenu(){
    var currentSubNode = null;

    for(const childNode of this.childrenNodes()) {
      let displayName = this.getDisplayName(childNode);
      if(this.props.subRoute === displayName){
        currentSubNode = childNode;
        break;
      }
    }
    return currentSubNode
  }

  getDisplayName(Component) {
    return Component.displayName || Component.name || Component.type.displayName || Component.type.name || 'Component';
  }


  renderNavLink(){
    return this.childrenNodes().map((childNode) => {
      let displayName = this.getDisplayName(childNode);
      let liClassName = classNames({
        "is-active": this.props.subRoute === displayName
      });
      let onClick = (e) => {
        this.props.changeProducerSubRoute(displayName);
      };
      return (<li key={displayName} className={liClassName} onClick={onClick}><a>{displayName}</a></li>);
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
        {this.renderCurrentSubMenu()}
      </div>
    );
  }
}
