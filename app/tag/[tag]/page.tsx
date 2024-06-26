import { getAllPosts } from "@/lib/posts";
import TagDatePage from "./[date]/page";
import { metadata } from "@/lib/metadata";

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

  return metadata(
    `기기기그 #${tag}`,
    tagPosts.map((post) => post.title).join(", "),
    keywords
  );
};

const TagPage = ({ params }: TagPageProps) => {
  const { tag } = params;

  return <TagDatePage params={{ tag, date: "" }} />;
};

export default TagPage;
