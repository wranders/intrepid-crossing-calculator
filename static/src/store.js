import items from './reducers/items';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
export default createStore(items, applyMiddleware(thunk));