import { combineReducers } from 'redux'
import producerForm from './producer_form'
import producerHistory from './producer_history'
const ProducerReducer = combineReducers({
  producerForm,
  producerHistory
});
export default ProducerReducer;
