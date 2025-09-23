import { useState } from 'react';
import { useCreatePostMutation, useUpdatePostMutation } from '../postsApi';
import type { Post as PostType } from '../postsApi';

interface PostFormProps {
  post?: PostType;
  onSuccess?: () => void;
}

const PostForm = ({ post, onSuccess }: PostFormProps) => {
  const [title, setTitle] = useState(post?.title || '');
  const [content, setContent] = useState(post?.content || '');
  
  const [createPost] = useCreatePostMutation();
  const [updatePost] = useUpdatePostMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (post) {
        await updatePost({ id: post.id, data: { title, content } }).unwrap();
        console.log('Post updated successfully');
      } else {
        await createPost({ title, content }).unwrap();
        console.log('Post created successfully');
      }
      onSuccess?.();
    } catch (error) {
      console.error('Failed to save post:', error);
      alert(`Error saving post: ${typeof error === 'object' && error !== null && 'data' in error ? 
        (error as any).data?.message || 'Unknown error' : 
        'Network error or server unavailable'
      }`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          required
        />
      </div>
      
      
      <div>
        <label htmlFor="content" className="block text-sm font-medium text-gray-700">
          Content
        </label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={10}
          className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          required
        />
      </div>
      
      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={onSuccess}
          className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          {post ? 'Update Post' : 'Create Post'}
        </button>
      </div>
    </form>
  );
};

export default PostForm;
