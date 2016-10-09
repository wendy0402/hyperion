import React,{Component} from 'react'

export default class TemplateCollectionList{
  constructor(props){
    super(props)
    this.renderTemplates = this.renderTemplates.bind(this);
  }

  renderTemplates(){
    return this.props.templates.map((template) => {
      return (
        <li key={template.id}>
          <a>{template.name}</a>
        </li>
      );
    });
  }

  render(){
    return(
      <li key={id} onClick={this.props.handleClick}>
        <a href="#">{this.props.name}</a>
        <ul> {this.renderTemplates()} </ul>
      </li>
    );
  }
}
