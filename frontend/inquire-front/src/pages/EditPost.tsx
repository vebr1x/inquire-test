import { useParams, useNavigate } from 'react-router-dom';
import { useGetPostQuery } from '../features/posts/postsApi';
import PostForm from '../features/posts/components/PostForm';

const EditPost = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const postId = parseInt(id!);
  
  const { data: post, error, isLoading } = useGetPostQuery(postId);

  const handleSuccess = () => {
    navigate(`/post/${postId}`);
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
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Edit Post</h1>
        <p className="text-gray-600">Update your post content</p>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-8">
        <PostForm post={post} onSuccess={handleSuccess} />
      </div>
    </div>
  );
};

export default EditPost;
