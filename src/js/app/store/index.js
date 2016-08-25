import { createStore, applyMiddleware } from 'redux';
import ProducerReducer from '../reducers';
import thunk from 'redux-thunk';

const arthurStore = createStore(
  ProducerReducer,
  applyMiddleware(thunk)
);


arthurStore.subscribe(()=>{
  console.log(arthurStore.getState());
});

export default arthurStore
