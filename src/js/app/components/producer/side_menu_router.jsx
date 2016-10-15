import React,{Component} from 'react'
import {connect} from 'react-redux'

import SubNav from './sub_nav'
import History from './history'
import Collection from './collection'

import { updateProducerForm } from '../../actions/producer_form_action'
import { initializeHistory } from '../../actions/producer_history'
import { changeProducerSubRoute } from '../../actions/producer_route'
import { fetchTemplatesWithCollection, initializeCollection } from '../../actions/producer_collection'


class SideMenuRouter extends Component{
  constructor(props){
    super(props)
  }

  render(){
    return(
      <SubNav subRoute={this.props.subRoute} actions={this.ProducerRouteAction} changeProducerSubRoute={this.props.changeProducerSubRoute}>
        <History
          histories={this.props.histories}
          onClickHistory={this.props.updateProducerForm}
          onActive={this.props.initializeHistory }
          />
        <Collection
          collections={this.props.collections}
          onActive={this.props.initializeCollection}
          onClickTemplate={this.props.updateProducerForm}
          onClickCollection={this.props.fetchTemplatesWithCollection}
          />
      </SubNav>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    histories: state.producerHistory.histories,
    subRoute: state.producerRoute.subRoute,
    collections: state.producerCollection
  }
}

const mapDispatchToProps = {
  fetchTemplatesWithCollection,
  changeProducerSubRoute,
  initializeCollection,
  updateProducerForm,
  initializeHistory,
}
export default connect(mapStateToProps, mapDispatchToProps)(SideMenuRouter);
