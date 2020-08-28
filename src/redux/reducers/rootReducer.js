import { combineReducers } from "redux";
import customizer from "./customizer/";
import auth from "./auth/";
import navbar from "./navbar/Index";
import global from "./global";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "jwt",
  storage,
  whitelist: ["auth"],
};

const rootReducer = combineReducers({
  customizer: customizer,
  auth: auth,
  navbar: navbar,
  global,
});

export default persistReducer(persistConfig, rootReducer);
