import { combineReducers, createStore,applyMiddleware } from "redux";
import userData from "./reducers/userData";
import reduxThunk from "redux-thunk";
const initState = {};
const reducer = combineReducers({
  userData
});
const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducer, initState);

store.subscribe(() => {
  console.log(store.getState());
});
export default store;
