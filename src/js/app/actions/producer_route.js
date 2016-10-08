import { CHANGE_SUBROUTE } from '../constants/action_types'

export function changeProducerSubRoute(route){
  return {
    type: CHANGE_SUBROUTE,
    subRoute: route
  }
}
