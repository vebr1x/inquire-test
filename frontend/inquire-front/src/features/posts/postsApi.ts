import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface Post {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  comments: Comment[];
}

export interface Comment {
  id: string;
  text: string;
  createdAt: string;
  postId: string;
}

export interface CreatePostRequest {
  title: string;
  content: string;
}

export interface UpdatePostRequest {
  title?: string;
  content?: string;
}

export interface PostsResponse {
  data: Post[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

const API_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

if (!API_BASE_URL) {
  console.error('VITE_BACKEND_BASE_URL environment variable is not set');
}

export const postsApi = createApi({
  reducerPath: 'postsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_BASE_URL}/posts`,
    prepareHeaders: (headers) => {
      headers.set('Content-Type', 'application/json');
      return headers;
    },
  }),
  tagTypes: ['Post'],
  endpoints: (builder) => ({
    getPosts: builder.query<PostsResponse, { page?: number; limit?: number }>({
      query: ({ page = 1, limit = 10 } = {}) => `?page=${page}&limit=${limit}`,
      providesTags: ['Post'],
    }),
    getPost: builder.query<Post, string>({
      query: (id) => `/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Post', id }],
    }),
    createPost: builder.mutation<Post, CreatePostRequest>({
      query: (newPost) => ({
        url: '',
        method: 'POST',
        body: newPost,
      }),
      invalidatesTags: ['Post'],
    }),
    updatePost: builder.mutation<Post, { id: string; data: UpdatePostRequest }>({
      query: ({ id, data }) => ({
        url: `/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: 'Post', id }],
    }),
    deletePost: builder.mutation<void, string>({
      query: (id) => ({
        url: `/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_result, _error, id) => [{ type: 'Post', id }],
    }),
  }),
});

export const {
  useGetPostsQuery,
  useGetPostQuery,
  useCreatePostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
} = postsApi;
