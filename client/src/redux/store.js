import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import pressKitReducer from './slices/pressKitSlice';
import mediaReducer from './slices/mediaSlice';
import analyticsReducer from './slices/analyticsSlice';
import uiReducer from './slices/uiSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    pressKit: pressKitReducer,
    media: mediaReducer,
    analytics: analyticsReducer,
    ui: uiReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ['persist/PERSIST'],
        // Ignore these field paths in all actions
        ignoredActionPaths: ['payload.files', 'meta.arg.files'],
        // Ignore these paths in the state
        ignoredPaths: ['media.uploadedFiles'],
      },
    }),
});

export default store;