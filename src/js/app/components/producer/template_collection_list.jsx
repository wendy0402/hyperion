import React,{Component} from 'react'

export default class TemplateCollectionList extends Component{
  constructor(props){
    super(props)
    this.renderTemplates = this.renderTemplates.bind(this);
  }

  renderTemplates(){
    return this.props.templates.map((template) => {
      const handleClickTemplate = (e) => {
        this.props.onClickTemplate(template);
      }

      return (
        <li key={template.id} onClick={handleClickTemplate}>
          <a>{template.name}</a>
        </li>
      );
    });
  }

  render(){
    return(
      <li onClick={this.props.onClick}>
        <a>{this.props.name}</a>
        <ul> {this.renderTemplates()} </ul>
      </li>
    );
  }
}
