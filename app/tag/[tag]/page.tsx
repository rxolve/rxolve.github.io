import ArticleList from "@/app/components/article-list";
import { getAllPosts } from "@/lib/posts";
import { udpateVisitorCount } from "@/lib/visitor-count";
import Link from "next/link";

interface TagPageProps {
  params: {
    tag: string;
  };
}

export const generateStaticParams = async () => {
  const allPosts = getAllPosts();
  const tagList = new Set(allPosts.flatMap((post) => post.tags));

  await udpateVisitorCount();

  return Array.from(tagList).map((tag) => ({
    tag,
  }));
};

const TagPage = ({ params }: TagPageProps) => {
  const { tag } = params;

  const allPosts = getAllPosts();
  const postList = allPosts.filter((post) => post.tags?.includes(tag));

  return (
    <main>
      <article>
        <Link href="/">
          <button className="outline" style={{ margin: "0.5rem 0" }}>
            &larr;
          </button>
        </Link>
        <h1>{tag}</h1>
      </article>
      <ArticleList list={postList} />
    </main>
  );
};

export default TagPage;
