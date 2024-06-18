import { MDXRemote } from "next-mdx-remote/rsc";
import { mdxComponents } from "@/lib/mdx-components";
import { PostData } from "@/types/post";
import TagButton from "./tag-button";

interface ArticleListProps {
  list?: PostData[];
}

const ArticleList = ({ list }: ArticleListProps) => {
  return (
    <>
      {list?.map((post, i) => (
        <article key={post.id}>
          <details open={i === 0}>
            <summary>
              {post.date} {post.title}
            </summary>
            <MDXRemote source={post.content} components={mdxComponents} />
            {post.tags &&
              post.tags.map((tag) => <TagButton key={tag} tag={tag} />)}
          </details>
        </article>
      ))}
    </>
  );
};

export default ArticleList;
