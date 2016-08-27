import { combineReducers } from 'redux'
import producerForm from './producer_form'
import producerHistory from './producer_history'
import producerRoute from './producer_route'
const ProducerReducer = combineReducers({
  producerForm,
  producerHistory,
  producerRoute
});
export default ProducerReducer;
