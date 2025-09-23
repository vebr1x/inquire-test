import { Link } from 'react-router-dom';
import type { Post as PostType } from '../postsApi';

interface PostCardProps {
  post: PostType;
}

const PostCard = ({ post }: PostCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <h2 className="text-xl font-semibold text-gray-900 mb-2">
        <Link 
          to={`/post/${post.id}`} 
          className="hover:text-blue-600 transition-colors"
        >
          {post.title}
        </Link>
      </h2>
      
      <p className="text-gray-600 mb-4 line-clamp-3">
        {post.content}
      </p>
      
      <div className="flex justify-between items-center text-sm text-gray-500">
        <span>{new Date(post.createdAt).toLocaleDateString()}</span>
        <span>{post.comments?.length || 0} comments</span>
      </div>
      
      <div className="mt-4 flex space-x-2">
        <Link
          to={`/post/${post.id}`}
          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
        >
          Read More
        </Link>
        <Link
          to={`/edit/${post.id}`}
          className="text-gray-600 hover:text-gray-800 text-sm font-medium"
        >
          Edit
        </Link>
      </div>
    </div>
  );
};

export default PostCard;
