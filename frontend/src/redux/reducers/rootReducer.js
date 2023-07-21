import { combineReducers } from "redux";
import contactoReducer from "./contactoReducer";
import userReducer from "./userReducer";

const rootReducers= combineReducers({
    contactoReducer,
    userReducer
})

export default rootReducers;