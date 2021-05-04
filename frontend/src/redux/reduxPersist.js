import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

export const persist = (persistConfig, reducer) =>
  persistReducer({ ...persistConfig, storage }, reducer);
