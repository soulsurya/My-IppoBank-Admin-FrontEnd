import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { UserReducer } from "./reducers/UserReducer";

const composedEnhancer = composeWithDevTools(applyMiddleware(thunk));

const store = createStore(UserReducer, composedEnhancer);
export default store;
