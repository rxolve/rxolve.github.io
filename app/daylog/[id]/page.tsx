// app/posts/[id]/page.tsx
import { getPostData, getAllPostIds } from '../../../lib/daylog-posts';
import { MDXRemote } from 'next-mdx-remote/rsc';

interface PostPageProps {
  params: {
    id: string;
  };
}

export async function generateStaticParams() {
  const paths = getAllPostIds();
  return paths.map((path) => path.params);
}

const PostPage = async ({ params }: PostPageProps) => {
  const postData = getPostData(params.id);

  return (
    <article>
      <h1>{postData.title}</h1>
      <p>{postData.date}</p>
      <MDXRemote source={postData.content} />
    </article>
  );
};

export default PostPage;
