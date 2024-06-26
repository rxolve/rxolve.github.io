import ArticleList from "@/app/ui/article-list";
import { getAllPosts, getPost } from "@/lib/posts";
import Link from "next/link";

interface Params {
  tag: string;
  date: string;
}

interface TagDatePageProps {
  params: Params;
}

export const generateStaticParams = async () => {
  const allPosts = await getAllPosts();

  const paramList: Params[] = allPosts.flatMap(
    (post) => post.tags?.map((tag) => ({ tag, date: post.date })) ?? []
  );

  return paramList;
};

export const generateMetadata = async ({ params }: TagDatePageProps) => {
  const { tag, date } = params;

  const post = await getPost(date);
  return {
    title: post.title,
    description: post.content,
    keywords: [post.title, tag],
    openGraph: {
      title: post.title,
      description: post.content,
      images: [
        {
          url: "/og-image.webp",
        },
      ],
    },
  };
};

const TagDatePage = async ({ params }: TagDatePageProps) => {
  const { tag, date } = params;

  const allPosts = await getAllPosts();
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
      <ArticleList list={postList} date={date} />
    </main>
  );
};

export default TagDatePage;
