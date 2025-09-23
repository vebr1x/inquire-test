import { configureStore } from '@reduxjs/toolkit';
import { postsApi } from '../features/posts/postsApi';
import { commentsApi } from '../features/comments/commentsApi';
import postsReducer from '../features/posts/postsSlice';

export const store = configureStore({
  reducer: {
    [postsApi.reducerPath]: postsApi.reducer,
    [commentsApi.reducerPath]: commentsApi.reducer,
    posts: postsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [postsApi.util.resetApiState.type, commentsApi.util.resetApiState.type],
      },
    }).concat(postsApi.middleware, commentsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
