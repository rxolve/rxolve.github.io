import ArticleList from "@/app/components/article-list";
import { getAllPosts } from "@/lib/posts";
import Link from "next/link";

interface TagPageProps {
  params: {
    tag: string;
  };
}

export async function generateStaticParams() {
  const allPosts = getAllPosts();
  const tagList = new Set(allPosts.flatMap((post) => post.tags));

  return Array.from(tagList).map((tag) => ({
    tag,
  }));
}

const TagPage = ({ params }: TagPageProps) => {
  const { tag } = params;

  const allPosts = getAllPosts();
  const tagList = Array.from(
    new Set(allPosts.flatMap((post) => post.tags).filter(Boolean))
  );
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
