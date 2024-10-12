import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import { persistStore, persistReducer } from 'redux-persist';
import storageSession from 'redux-persist/lib/storage/session';
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import assistantReducer from "./assistantSlice";

const userPersistConfig = {
  key: 'user',
  storage: storageSession,    
};

const assistantPersistConfig = {
  key: 'assistant',
  storage: storageSession,
};

const persistedUserReducer = persistReducer(userPersistConfig, userReducer);
const persistedAssistantReducer = persistReducer(assistantPersistConfig, assistantReducer);

export const store = configureStore({
  reducer: {
    user: persistedUserReducer,
    assistant: persistedAssistantReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;