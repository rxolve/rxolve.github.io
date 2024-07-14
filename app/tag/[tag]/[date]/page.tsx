import ArticleList from "@/app/ui/article-list";
import { metadata } from "@/lib/metadata";
import { getAllPosts, getPost } from "@/lib/posts";
import Link from "next/link";

export const generateStaticParams = async () => {
  const allPosts = await getAllPosts();

  const paramList: TagParams[] = allPosts.flatMap(
    (post) => post.tags?.map((tag) => ({ tag, date: post.date })) ?? []
  );

  return paramList;
};

export const generateMetadata = async ({ params }: TagDatePageProps) => {
  const { tag, date } = params;

  const post = await getPost({ date });
  return metadata(post.title, post.content, [tag, post.title]);
};

const TagDatePage = async ({ params }: TagDatePageProps) => {
  const { tag, date, isEn = false } = params;

  const allPosts = await getAllPosts({ isEn });
  const postList = allPosts.filter((post) => post.tags?.includes(tag));

  return (
    <main>
      <article>
        <Link href={isEn ? "/en" : "/"}>
          <button className="outline" style={{ margin: "0.5rem 0" }}>
            &larr;
          </button>
        </Link>
        <h1>{tag}</h1>
      </article>
      <ArticleList list={postList} date={date} />
    </main>
  );
};

export default TagDatePage;
