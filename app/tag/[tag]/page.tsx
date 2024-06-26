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

const TagPage = ({ params }: TagPageProps) => {
  const { tag } = params;

  return <TagDatePage params={{ tag, date: "" }} />;
};

export default TagPage;
