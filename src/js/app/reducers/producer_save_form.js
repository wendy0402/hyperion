import {
  CLOSE_SAVE_FORM,
  OPEN_SAVE_FORM,
  USE_EXISTING_COLLECTION_FIELD,
  USE_NEW_COLLECTION_FIELD,
  UPDATE_SAVE_FORM_FIELD,
  CREATE_COLLECTION
} from '../constants/action_types'
const initialState = {
  active: false,
  newCollection: false,
  templateCollections: [],
  form: {
    selectedCollection: "",
    newCollectionName: "",
    templateName: "",
    result: "",
    resultMessage: ""
  }
}
export default function producerSaveForm(state=initialState, action){
  switch(action.type){
    case OPEN_SAVE_FORM:
      return Object.assign({}, state, {
        active: true,
        templateCollections: action.templateCollections
      });
    case USE_EXISTING_COLLECTION_FIELD:
      return Object.assign({}, state, {
        newCollection: false,
      });
    case USE_NEW_COLLECTION_FIELD:
      return Object.assign({}, state, {
        newCollection: true,
      });
    case UPDATE_SAVE_FORM_FIELD:
      return Object.assign({}, state, {
        form: Object.assign({}, state.form, action.formValues)
      });
    case CLOSE_SAVE_FORM:
      return Object.assign({}, state, {
        active: false,
      });
    case CREATE_COLLECTION:
      return Object.assign({}, state, {
        form: Object.assign({}, state.form, {
          result: action.result,
          resultMessage: action.resultMessage
        })
      })
    default:
    return state;
  }
}
