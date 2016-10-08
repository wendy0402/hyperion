import { Collection } from '../model/history'
import { arrayModelToObj } from '../util'
export function initializeHistory(){
  return (dispatch) => { fetchAllHistories(dispatch) }
}

export function openCollection(){
  return(
    (dispatch) =>{
      TemplateCollection.fetchAll((templateCollections) =>{
        dispatch({
          type: UPDATE_COLLECTIONS,
          templateCollections: arrayModelToObj(templateCollections)
        });
        dispatch({
          type: OPEN_COLLECTION
        })
      });
    }
  );
}
