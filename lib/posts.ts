import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import { PostData } from "../types/post";

const postsDirectory = path.join(process.cwd(), "daylog");

const findSubdirectories = async (dir: string): Promise<string[]> => {
  let results: string[] = [];
  const list = await fs.readdir(dir, { withFileTypes: true });

  for (const dirent of list) {
    const filePath = path.join(dir, dirent.name);
    if (dirent.isDirectory()) {
      results.push(filePath);
      results = results.concat(await findSubdirectories(filePath));
    }
  }

  return results;
};

export const getAllPosts = async (): Promise<PostData[]> => {
  const fileFolders = await findSubdirectories(postsDirectory);
  const fileNames = (
    await Promise.all(
      fileFolders.map(async (folder) => {
        const files = await fs.readdir(folder);
        return files.map((file) => path.join(folder, file));
      })
    )
  ).flat();

  const mdxFiles = fileNames
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => path.relative(postsDirectory, file));

  const allPostsData = (
    await Promise.all(
      mdxFiles.map(async (fileName) => {
        const id = fileName.replace(/\.mdx$/, "");
        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = await fs.readFile(fullPath, "utf8");
        const { data, content } = matter(fileContents);

        return {
          id,
          ...data,
          content,
        } as PostData;
      })
    )
  )
    .filter((post) => post.title)
    .reverse();

  return allPostsData;
};

export const getPost = async (date: string): Promise<PostData> => {
  if (!date || date.length !== 6) {
    throw new Error("Invalid date");
  }

  const year = date.slice(0, 2);
  const month = date.slice(2, 4);

  const fullPath = path.join(
    `${postsDirectory}/${year}/${month}`,
    `${date}.mdx`
  );
  const fileContents = await fs.readFile(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    id: date,
    ...data,
    content,
  } as PostData;
};
