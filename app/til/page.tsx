import { getAllPosts } from '../../lib/posts';

const folder = 'til';

const PostsPage = async () => {
  const posts = getAllPosts(folder);

  return (
    <div>
      <h1>Today I Learned</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <details open>
              <summary>
                {post.date} | {post.title}
              </summary>
              <p>{post.content}</p>
            </details>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostsPage;
