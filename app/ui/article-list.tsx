import { MDXRemote } from "next-mdx-remote/rsc";
import { mdxComponents } from "@/lib/mdx-components";
import { PostData } from "@/type/post.type";
import TagButton from "./tag-button";

interface ArticleListProps {
  list?: PostData[];
  date?: string;
}

const ArticleList = ({ list, date }: ArticleListProps) => {
  if (list && date) {
    const index = list.findIndex((post) => post.date === date);
    list = [list[index], ...list.filter((_, i) => i !== index)];
  }

  return (
    <>
      {list?.map((post) => (
        <article key={post.id}>
          <details open={list?.length === 1 || date === post.date}>
            <summary>
              {post.date} {post.title}
            </summary>
            <MDXRemote source={post.content} components={mdxComponents} />
            {post.tags &&
              post.tags.map((tag) => (
                <TagButton key={tag} tagItem={{ tag, count: 0 }} />
              ))}
          </details>
        </article>
      ))}
    </>
  );
};

export default ArticleList;
