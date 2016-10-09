import React, { Component } from 'react'
import TemplateCollectionList from './template_collection_list'
export default class Collection extends Component{
  constructor(props){
    super(props);
    this.renderCollection = this.renderCollection.bind(this);
    this.groupTemplatesByCollection = this.groupTemplatesByCollection.bind(this);
  }

  componentDidMount(){
    this.props.actions.initializeCollection();
  }
  groupTemplatesByCollection(){
    let groupedTemplates = {}
    Object.keys(this.props.collections.templates).forEach((id) => {
      let template = this.props.collections.templates[id];
      if(groupedTemplates[template.collection_id] === undefined){
        groupedTemplates[template.collection_id] = []
      }
      groupedTemplates[template.collection_id].push(template)
    })
    return groupedTemplates;
  }

  renderCollection(){
    let templates = this.groupTemplatesByCollection();

    let templateCollections = this.props.collections.templateCollections;

    return Object.keys(templateCollections).map((id) => {
      let collection = templateCollections[id]
      const handleClick = (e) => {
        this.props.actions.fetchTemplatesWithCollection(id);
      }
      return(
        <TemplateCollectionList
          key={id}
          onClick={handleClick}
          templates={templates[id] || []}
          name={collection.name}
          onClickTemplate={this.props.onClickTemplate}/>
      );
    });
  }

  render(){
    return(
      <aside className="menu">
        <ul className="menu-list">
          {this.renderCollection()}
        </ul>
      </aside>
    );
  }
}
