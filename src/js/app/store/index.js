import { createStore, applyMiddleware } from 'redux';
import ProducerReducer from '../reducers';
import thunk from 'redux-thunk';

const hyperionStore = createStore(
  ProducerReducer,
  applyMiddleware(thunk)
);


hyperionStore.subscribe(()=>{
  console.log(hyperionStore.getState());
});

export default hyperionStore
