import { getAllPosts } from '../../lib/daylog-posts';
import { PostMetaData } from '../../types/post';

interface PostsPageProps {
  posts: PostMetaData[];
}

export async function fetchStaticData() {
  console.log('fetchStaticData');
  const posts = getAllPosts();

  return {
    props: {
      posts,
    },
  };
}

const PostsPage = ({ posts }: PostsPageProps) => {
  return (
    <div>
      <h1>All Posts</h1>
      <ul>
        {posts?.map((post) => (
          <li key={post.id}>
            <a href={`/posts/${post.id}`}>
              {post.title} ({post.date})
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostsPage;
