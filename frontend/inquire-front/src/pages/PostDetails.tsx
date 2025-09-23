import { useParams, Link } from 'react-router-dom';
import { useGetPostQuery, useDeletePostMutation } from '../features/posts/postsApi';
import { useGetCommentsQuery, useCreateCommentMutation, useUpdateCommentMutation, useDeleteCommentMutation } from '../features/comments/commentsApi';
import { useState } from 'react';

const PostDetails = () => {
  const { id } = useParams<{ id: string }>();
  
  const { data: post, error, isLoading } = useGetPostQuery(id!);
  const { data: comments = [] } = useGetCommentsQuery(id!);
  const [deletePost] = useDeletePostMutation();
  const [createComment] = useCreateCommentMutation();
  const [updateComment] = useUpdateCommentMutation();
  const [deleteComment] = useDeleteCommentMutation();
  
  const [commentContent, setCommentContent] = useState('');
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [editingCommentText, setEditingCommentText] = useState('');

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await deletePost(id!).unwrap();
        console.log('Post deleted successfully');
        window.location.href = '/';
      } catch (error) {
        console.error('Failed to delete post:', error);
        alert(`Error deleting post: ${typeof error === 'object' && error !== null && 'data' in error ? 
          (error as any).data?.message || 'Unknown error' : 
          'Network error or server unavailable'
        }`);
      }
    }
  };

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentContent.trim()) return;
    
    try {
      await createComment({
        postId: id!,
        text: commentContent,
      }).unwrap();
      console.log('Comment added successfully');
      setCommentContent('');
    } catch (error) {
      console.error('Failed to add comment:', error);
      alert(`Error adding comment: ${typeof error === 'object' && error !== null && 'data' in error ? 
        (error as any).data?.message || 'Unknown error' : 
        'Network error or server unavailable'
      }`);
    }
  };

  const handleEditComment = (commentId: string, currentText: string) => {
    setEditingCommentId(commentId);
    setEditingCommentText(currentText);
  };

  const handleUpdateComment = async (commentId: string) => {
    if (!editingCommentText.trim()) return;
    
    try {
      await updateComment({
        postId: id!,
        commentId,
        data: { text: editingCommentText }
      }).unwrap();
      console.log('Comment updated successfully');
      setEditingCommentId(null);
      setEditingCommentText('');
    } catch (error) {
      console.error('Failed to update comment:', error);
      alert(`Error updating comment: ${typeof error === 'object' && error !== null && 'data' in error ? 
        (error as any).data?.message || 'Unknown error' : 
        'Network error or server unavailable'
      }`);
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    if (window.confirm('Are you sure you want to delete this comment?')) {
      try {
        await deleteComment({
          postId: id!,
          commentId
        }).unwrap();
        console.log('Comment deleted successfully');
      } catch (error) {
        console.error('Failed to delete comment:', error);
        alert(`Error deleting comment: ${typeof error === 'object' && error !== null && 'data' in error ? 
          (error as any).data?.message || 'Unknown error' : 
          'Network error or server unavailable'
        }`);
      }
    }
  };

  const handleCancelEdit = () => {
    setEditingCommentId(null);
    setEditingCommentText('');
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="text-gray-600">Loading post...</div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="text-red-600">Post not found</div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-8 mb-8">
        <div className="flex justify-between items-start mb-6">
          <h1 className="text-3xl font-bold text-gray-900">{post.title}</h1>
          <div className="flex space-x-2">
            <Link
              to={`/edit/${post.id}`}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Edit
            </Link>
            <button
              onClick={handleDelete}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        </div>
        
        <div className="text-gray-600 mb-6">
          <p>{new Date(post.createdAt).toLocaleDateString()}</p>
        </div>
        
        <div className="prose max-w-none">
          <p className="text-gray-800 whitespace-pre-wrap">{post.content}</p>
        </div>
      </div>

      {/* Comments Section */}
      <div className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Comments</h2>
        
        {/* Add Comment Form */}
        <form onSubmit={handleAddComment} className="mb-8 p-4 bg-gray-50 rounded-lg">
          <textarea
            placeholder="Write a comment..."
            value={commentContent}
            onChange={(e) => setCommentContent(e.target.value)}
            rows={3}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500 mb-4"
            required
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Add Comment
          </button>
        </form>

        {/* Comments List */}
        <div className="space-y-4">
          {comments && comments.length > 0 ? (
            comments.map((comment) => (
              <div key={comment.id} className="border-b border-gray-200 pb-4">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-gray-500">
                      {new Date(comment.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEditComment(comment.id, comment.text)}
                      className="text-blue-600 hover:text-blue-800 text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteComment(comment.id)}
                      className="text-red-600 hover:text-red-800 text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
                
                {editingCommentId === comment.id ? (
                  <div className="mt-2">
                    <textarea
                      value={editingCommentText}
                      onChange={(e) => setEditingCommentText(e.target.value)}
                      rows={3}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500 mb-2"
                    />
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleUpdateComment(comment.id)}
                        className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
                      >
                        Save
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        className="px-3 py-1 bg-gray-500 text-white rounded-md hover:bg-gray-600 text-sm"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <p className="mt-2 text-gray-800">{comment.text}</p>
                )}
              </div>
            ))
          ) : (
            <p className="text-gray-500">No comments yet. Be the first to comment!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostDetails;
