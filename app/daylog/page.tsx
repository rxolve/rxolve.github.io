import { getAllPosts } from '../../lib/daylog-posts';

const PostsPage = async () => {
  const posts = getAllPosts();

  return (
    <div>
      <h1>All Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <a href={`/daylog/${post.date}`}>
              {post.date} | {post.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostsPage;
