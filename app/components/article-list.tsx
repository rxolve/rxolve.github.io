import { getAllPosts } from "@/lib/posts";
import { MDXRemote } from "next-mdx-remote/rsc";
import { mdxComponents } from "@/lib/mdx-components";

const ArticleList = () => {
  const posts = getAllPosts();

  return (
    <>
      {posts.map((post) => (
        <article key={post.id}>
          <details>
            <summary>
              {post.date} | {post.title}
            </summary>
            <MDXRemote source={post.content} components={mdxComponents} />
          </details>
        </article>
      ))}
    </>
  );
};

export default ArticleList;
