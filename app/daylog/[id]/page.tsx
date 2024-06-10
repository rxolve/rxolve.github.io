import { getPostData, getAllPostIds } from "../../../lib/posts";
import { MDXRemote } from "next-mdx-remote/rsc";

const folder = "daylog";

interface PostPageProps {
  params: {
    id: string;
  };
}

export async function generateStaticParams() {
  const paths = getAllPostIds(folder);
  return paths.map((path) => path.params);
}

const PostPage = async ({ params }: PostPageProps) => {
  const postData = getPostData(folder, params.id);

  return (
    <article>
      <h1>{postData.title}</h1>
      <p>{postData.date}</p>
      <p>{postData.tags?.join(", ")}</p>
      <MDXRemote source={postData.content} />
    </article>
  );
};

export default PostPage;
