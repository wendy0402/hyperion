import {
  CLOSE_SAVE_FORM,
  UPDATE_COLLECTIONS,
  OPEN_SAVE_FORM,
  USE_NEW_COLLECTION_FIELD,
  USE_EXISTING_COLLECTION_FIELD,
  UPDATE_SAVE_FORM_FIELD,
  CREATE_COLLECTION
} from '../constants/action_types'
import { TemplateCollection } from '../model/template_collection'
import { Template } from '../model/template'
import { arrayModelToObj } from '../util'
import { ProducerConst } from '../constants/producer_const'
import { refreshCollection } from './producer_collection'
export function closeSaveForm(){
  return({
    type: CLOSE_SAVE_FORM
  });
}

export function openSaveForm(){
  return(
    (dispatch) =>{
      TemplateCollection.fetchAll((templateCollections) =>{
        dispatch({
          type: UPDATE_COLLECTIONS,
          templateCollections: arrayModelToObj(templateCollections)
        });
        dispatch({
          type: OPEN_SAVE_FORM
        })
      });
    }
  );
}

export function useNewCollectionField(){
  return({ type: USE_NEW_COLLECTION_FIELD});
}

export function useExistingCollectionField(){
  return({ type: USE_EXISTING_COLLECTION_FIELD});
}

export function updateSaveFormField(formValues){
  return({ type: UPDATE_SAVE_FORM_FIELD, formValues });
}
// @TODO: refactor, code add Template with create collection almost same
export function addTemplateToCollection(collectionID, templateParams){
  return((dispatch) =>{
    Template.add(Object.assign({}, templateParams, { collection_id: collectionID }))
    .then((id) =>{
      dispatch({ type: CREATE_COLLECTION, result: ProducerConst.saveForm.result['success'], resultMessage: "success to store"});
      dispatch(updateSaveFormField({selectedCollection: "", newCollectionName: "", templateName: ""}))
      dispatch(refreshCollection());
      dispatch(closeSaveForm());
    })
    .catch((e)=>{
      console.error(e)
      dispatch({ type: CREATE_COLLECTION, result: ProducerConst.saveForm.result['failed'], resultMessage: e.message });
    });
  })
}

export function createCollectionWithTemplate(collectionName, templateParams){
  let _template = Template;
  return(
    (dispatch) =>{
      let params = { name: collectionName }
      TemplateCollection.add(params)
      .then((id)=>{
        return _template.add(Object.assign({}, templateParams, {collection_id: id}))
      })
      .then((id) =>{
        dispatch({ type: CREATE_COLLECTION, result: ProducerConst.saveForm.result['success'], resultMessage: "success to store"});
        dispatch(updateSaveFormField({selectedCollection: "", newCollectionName: "", templateName: ""}))
        dispatch(closeSaveForm());
      })
      .catch((e)=>{
        console.error(e)
        dispatch({ type: CREATE_COLLECTION, result: ProducerConst.saveForm.result['failed'], resultMessage: e.message });
      });
    }
  );
}
