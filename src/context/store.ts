import { configureStore } from '@reduxjs/toolkit';
import searchReducer from './searchSlice';

export const store = configureStore({
  reducer: {
    search: searchReducer, // Adicione o reducer do slice de pesquisa ao store
    // ...outros reducers
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch