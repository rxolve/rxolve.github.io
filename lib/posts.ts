import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { PostData, PostMetaData } from "../types/post";

export function getPostData(folder: string, id: string): PostData {
  const postsDirectory = path.join(process.cwd(), folder);
  const fullPath = path.join(postsDirectory, `${id}.mdx`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    id,
    title: data.title,
    date: data.date,
    tags: data.tags,
    content,
  };
}

export function getAllPosts(folder: string): PostData[] {
  const postsDirectory = path.join(process.cwd(), folder);
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames
    .filter((fileName) => fileName !== "404.mdx")
    .map((fileName) => {
      const id = fileName.replace(/\.mdx$/, "");
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContents);

      return {
        id,
        ...data,
        content,
      } as PostData;
    })
    .filter((post) => post.title)
    .reverse();

  return allPostsData;
}

export function getAllPostIds(folder: string) {
  const postsDirectory = path.join(process.cwd(), folder);
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map((fileName) => ({
    params: {
      id: fileName.replace(/\.mdx$/, ""),
    },
  }));
}
