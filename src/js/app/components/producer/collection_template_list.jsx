import React,{Component} from 'react'

export default class CollectionTemplateList{
  render(){
    return(
      <li key={id} onClick={handleClick}>
        <a href="#">{this.props.name}</a>
        <ul> {this.props.templates} </ul>
      </li>
    );
  }
}
