import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { PostData, PostMetaData } from "../types/post";

const postsDirectory = path.join(process.cwd(), "daylog");

export const getPostData = (id: string): PostData => {
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
};

export const getAllPosts = (): PostData[] => {
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
};

export const getAllPostMetaData = (): PostMetaData[] => {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsMetaData = fileNames
    .filter((fileName) => fileName !== "404.mdx")
    .map((fileName) => {
      const id = fileName.replace(/\.mdx$/, "");
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data } = matter(fileContents);

      return {
        id,
        ...data,
      } as PostMetaData;
    })
    .filter((post) => post.title)
    .reverse();

  return allPostsMetaData;
};
