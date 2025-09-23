import { useNavigate } from 'react-router-dom';
import PostForm from '../features/posts/components/PostForm';

const CreatePost = () => {
  const navigate = useNavigate();

  const handleSuccess = () => {
    navigate('/');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Create New Post</h1>
        <p className="text-gray-600">Share your thoughts with the community</p>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-8">
        <PostForm onSuccess={handleSuccess} />
      </div>
    </div>
  );
};

export default CreatePost;
