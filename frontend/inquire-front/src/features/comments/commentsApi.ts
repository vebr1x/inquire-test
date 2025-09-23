import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface Comment {
  id: string;
  text: string;
  createdAt: string;
  postId: string;
}

export interface CreateCommentRequest {
  text: string;
  postId: string;
}

export interface UpdateCommentRequest {
  text?: string;
}

const API_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

if (!API_BASE_URL) {
  console.error('VITE_BACKEND_BASE_URL environment variable is not set');
}

export const commentsApi = createApi({
  reducerPath: 'commentsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_BASE_URL}/posts`,
    prepareHeaders: (headers) => {
      headers.set('Content-Type', 'application/json');
      return headers;
    },
  }),
  tagTypes: ['Comment'],
  endpoints: (builder) => ({
    getComments: builder.query<Comment[], string>({
      query: (postId) => `/${postId}/comments`,
      providesTags: (_result, _error, postId) => [{ type: 'Comment', id: `LIST-${postId}` }],
    }),
    getComment: builder.query<Comment, { postId: string; commentId: string }>({
      query: ({ postId, commentId }) => `/${postId}/comments/${commentId}`,
      providesTags: (_result, _error, { commentId }) => [{ type: 'Comment', id: commentId }],
    }),
    createComment: builder.mutation<Comment, CreateCommentRequest>({
      query: ({ postId, text }) => ({
        url: `/${postId}/comments`,
        method: 'POST',
        body: { text },
      }),
      invalidatesTags: (_result, _error, { postId }) => [{ type: 'Comment', id: `LIST-${postId}` }],
    }),
    updateComment: builder.mutation<Comment, { postId: string; commentId: string; data: UpdateCommentRequest }>({
      query: ({ postId, commentId, data }) => ({
        url: `/${postId}/comments/${commentId}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: (_result, _error, { postId, commentId }) => [
        { type: 'Comment', id: commentId },
        { type: 'Comment', id: `LIST-${postId}` }
      ],
    }),
    deleteComment: builder.mutation<void, { postId: string; commentId: string }>({
      query: ({ postId, commentId }) => ({
        url: `/${postId}/comments/${commentId}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_result, _error, { postId, commentId }) => [
        { type: 'Comment', id: commentId },
        { type: 'Comment', id: `LIST-${postId}` }
      ],
    }),
  }),
});

export const {
  useGetCommentsQuery,
  useGetCommentQuery,
  useCreateCommentMutation,
  useUpdateCommentMutation,
  useDeleteCommentMutation,
} = commentsApi;
