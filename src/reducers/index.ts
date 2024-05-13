import { combineReducers } from "redux";
import users from "./users";
import user from "./user";

const reducer = combineReducers({
  user,
  users,
});

export default reducer;
