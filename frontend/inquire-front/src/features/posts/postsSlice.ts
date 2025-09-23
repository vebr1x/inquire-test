import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface PostsState {
  selectedPostId: number | null;
  filter: string;
  currentPage: number;
  pageSize: number;
}

const initialState: PostsState = {
  selectedPostId: null,
  filter: '',
  currentPage: 1,
  pageSize: 10,
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setSelectedPost: (state, action: PayloadAction<number | null>) => {
      state.selectedPostId = action.payload;
    },
    setFilter: (state, action: PayloadAction<string>) => {
      state.filter = action.payload;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setPageSize: (state, action: PayloadAction<number>) => {
      state.pageSize = action.payload;
      state.currentPage = 1; // Reset to first page when changing page size
    },
  },
});

export const { setSelectedPost, setFilter, setCurrentPage, setPageSize } = postsSlice.actions;
export default postsSlice.reducer;
