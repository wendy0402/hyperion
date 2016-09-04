import { CLOSE_SAVE_FORM, OPEN_SAVE_FORM, USE_NEW_COLLECTION_FIELD, USE_EXISTING_COLLECTION_FIELD, UPDATE_SAVE_FORM_FIELD } from '../constants/action_types'
import { TemplateCollection } from '../model/template_collection'
import { arrayModelToObj } from '../util'
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
          type: OPEN_SAVE_FORM,
          templateCollections: arrayModelToObj(templateCollections)
        });
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
//
// export function createCollection(collectionName){
//   return(
//     (dispatch) =>{
//       let params = {collectionName: collectionName}
//
//       TemplateCollection.add(params)
//       .then((id)=>{
//         dispatch({ type: CREATE_COLLECTION, result: 'success'});
//       })
//       .catch((e)=>{
//         dispatch({ type: CREATE_COLLECTION, result: 'failed' });
//       });
//
//     }
//   );
// }
