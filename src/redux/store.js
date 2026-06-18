import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from "redux-persist";
import storage from "redux-persist/es/storage";
import env from "@/utils/env";
import authReducer from "@/redux/auth/authSlice";
import linksReducer from "@/redux/links/linksSlice";

const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["token", "expiresAt"],
};

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  links: linksReducer,
});

const store = configureStore({
  reducer: rootReducer,
  devTools: env.ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
export default store;
