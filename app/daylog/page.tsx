import { getPostData, getAllPostIds } from '../lib/daylog-posts';
import { PostData } from '../types/post';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';

interface PostProps {
  postData: PostData;
  mdxSource: MDXRemoteSerializeResult;
}

export async function generateStaticParams() {
  const paths = getAllPostIds();
  return paths.map((path) => path.params);
}

export async function fetchStaticData({ params }: { params: { id: string } }) {
  const postData = getPostData(params.id);
  const mdxSource = await serialize(postData.content);

  return {
    props: {
      postData,
      mdxSource,
    },
  };
}

const Post = ({ postData, mdxSource }: PostProps) => {
  return (
    <article>
      <h1>{postData.title}</h1>
      <p>{postData.date}</p>
      <MDXRemote {...mdxSource} />
    </article>
  );
};

export default Post;
