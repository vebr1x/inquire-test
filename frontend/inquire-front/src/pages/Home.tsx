import PostList from '../features/posts/components/PostList';

const Home = () => {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Blog Posts</h1>
        <p className="text-gray-600">Discover the latest posts from our community</p>
      </div>
      
      <PostList />
    </div>
  );
};

export default Home;
