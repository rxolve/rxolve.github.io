import { getAllPosts } from "../../lib/posts";

const folder = "daylog";

const PostsPage = async () => {
  const posts = getAllPosts(folder);

  return (
    <div>
      <h1>어떤 날의 기록</h1>
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
