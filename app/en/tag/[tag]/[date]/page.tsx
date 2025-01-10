import TagDatePage from "@/app/tag/[tag]/[date]/page";
import { metadata } from "@/lib/metadata";
import { getAllPosts, getPost } from "@/lib/posts";

export const generateStaticParams = async () => {
  const allPosts = await getAllPosts({ isEn: true });

  const paramList: TagParams[] = allPosts.flatMap(
    (post) => post.tags?.map((tag) => ({ tag, date: post.date })) ?? []
  );

  return paramList;
};

export const generateMetadata = async ({ params }: TagDatePageProps) => {
  const { tag, date } = params;

  const post = await getPost({ date, isEn: true });
  return metadata(post.title, post.content, [tag, post.title]);
};

const EnTagDatePage = async ({ params }: TagDatePageProps) => {
  const { tag, date, isEn = true } = params;

  return <TagDatePage params={{ tag, date, isEn }} />;
};

export default EnTagDatePage;
