import { arrayModelToObj } from '../util'
import { TemplateCollection } from '../model/template_collection'
import { Template } from '../model/template'
import {UPDATE_COLLECTIONS, UPDATE_TEMPLATE_COLLECTIONS, REFRESH_COLLECTION} from '../constants/action_types'
export function initializeCollection(){
  return (dispatch) => { fetchAllCollection(dispatch) }
}

export function fetchTemplatesWithCollection(id) {
  return (dispatch) => {
    return Template.findByCollectionIds([id], (templates) => {
      let payload = {
        type: UPDATE_TEMPLATE_COLLECTIONS,
        templates: arrayModelToObj(templates),
        templateCollectionId: id
      }
      dispatch(payload);
    });
  }
}

export function refreshCollection(){
  return {
    type: REFRESH_COLLECTION,
  }
}

function fetchAllCollection(dispatch){
  return TemplateCollection.fetchAll((templateCollections) => {
    dispatch({
      type: UPDATE_COLLECTIONS,
      templateCollections: arrayModelToObj(templateCollections)
    });
  });
}
