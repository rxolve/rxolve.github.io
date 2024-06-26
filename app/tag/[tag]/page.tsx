import { getAllPosts } from "@/lib/posts";
import TagDatePage from "./[date]/page";

interface TagPageProps {
  params: {
    tag: string;
  };
}

export const generateStaticParams = async () => {
  const allPosts = await getAllPosts();
  const tagList = new Set(allPosts.flatMap((post) => post.tags));

  return Array.from(tagList).map((tag) => ({
    tag,
  }));
};

export const generateMetadata = async ({ params }: TagPageProps) => {
  const { tag } = params;
  const allPosts = await getAllPosts();
  const tagPosts = allPosts.filter((post) => post.tags?.includes(tag));
  const keywords = [tag, ...tagPosts.map((post) => post.title)];

  return {
    title: `#${tag}`,
    description: tagPosts.map((post) => post.title).join(", "),
    keywords,
    openGraph: {
      title: `#${tag}`,
      description: tagPosts.map((post) => post.title).join(", "),
      images: [
        {
          url: "/og-image.webp",
        },
      ],
    },
  };
};

const TagPage = ({ params }: TagPageProps) => {
  const { tag } = params;

  return <TagDatePage params={{ tag, date: "" }} />;
};

export default TagPage;
