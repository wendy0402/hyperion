import { CLOSE_SAVE_FORM, OPEN_SAVE_FORM } from '../constants/action_types'

export function closeSaveForm(){
  return({
    type: CLOSE_SAVE_FORM
  });
}

export function openSaveForm(){
  return({
    type: OPEN_SAVE_FORM
  });
}
