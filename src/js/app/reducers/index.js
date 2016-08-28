import { combineReducers } from 'redux'
import producerForm from './producer_form'
import producerHistory from './producer_history'
import producerRoute from './producer_route'
import producerSaveForm from './producer_save_form'
const ProducerReducer = combineReducers({
  producerForm,
  producerHistory,
  producerRoute,
  producerSaveForm
});
export default ProducerReducer;
