import { useGetPostsQuery } from '../postsApi';
import { useSelector } from 'react-redux';
import { type RootState } from '../../../app/store';
import PostCard from './PostCard';
import Pagination from './Pagination';

const PostList = () => {
  const { currentPage, pageSize } = useSelector((state: RootState) => state.posts);
  const { data: postsResponse, error, isLoading } = useGetPostsQuery({ 
    page: currentPage, 
    limit: pageSize 
  });
  const posts = postsResponse?.data || [];

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="text-gray-600">Loading posts...</div>
      </div>
    );
  }

  if (error) {
    console.error('Error loading posts:', error);
    return (
      <div className="flex justify-center items-center py-12">
        <div className="text-red-600">
          <p className="font-semibold">Error loading posts</p>
          <p className="text-sm mt-2">
            {typeof error === 'object' && error !== null && 'data' in error ? 
              (error as any).data?.message || 'Unknown error' : 
              'Network error or server unavailable'
            }
          </p>
        </div>
      </div>
    );
  }

  if (!posts || !Array.isArray(posts) || posts.length === 0) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="text-gray-600">No posts found</div>
      </div>
    );
  }

  return (
    <div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
      
      {postsResponse && (
        <Pagination
          totalPages={postsResponse.totalPages}
          currentPage={postsResponse.page}
          total={postsResponse.total}
          pageSize={postsResponse.limit}
        />
      )}
    </div>
  );
};

export default PostList;
