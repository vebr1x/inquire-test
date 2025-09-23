import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface CommentsState {
  selectedCommentId: number | null;
}

const initialState: CommentsState = {
  selectedCommentId: null,
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setSelectedComment: (state, action: PayloadAction<number | null>) => {
      state.selectedCommentId = action.payload;
    },
  },
});

export const { setSelectedComment } = commentsSlice.actions;
export default commentsSlice.reducer;
