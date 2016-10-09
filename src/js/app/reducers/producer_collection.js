import { UPDATE_COLLECTIONS, UPDATE_TEMPLATE_COLLECTIONS } from '../constants/action_types'

const initialState = {
  templateCollections: {},
  templates: {}
}

export default function producerCollection(state= initialState, action){
  switch(action.type){
    case UPDATE_COLLECTIONS:
      return Object.assign({}, state, {
        templateCollections: action.templateCollections
      });
    case UPDATE_TEMPLATE_COLLECTIONS:
      return Object.assign({}, state, {
        templates: action.templates
      });
    default:
      return state;
  }
}
