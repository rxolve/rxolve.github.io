import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { PostData, PostMetaData } from '../types/post';

const postsDirectory = path.join(process.cwd(), 'daylog');

export function getPostData(id: string): PostData {
  const fullPath = path.join(postsDirectory, `${id}.mdx`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    id,
    content,
    title: data.title,
    date: data.date,
    tags: data.tags,
  };
}

export function getAllPosts(): PostMetaData[] {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames
    .filter((fileName) => fileName !== '404.mdx')
    .map((fileName) => {
      const id = fileName.replace(/\.mdx$/, '');
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data } = matter(fileContents);

      return {
        id,
        ...data,
      } as PostMetaData;
    })
    .filter((post) => post.title)
    .reverse();

  return allPostsData;
}

export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map((fileName) => ({
    params: {
      id: fileName.replace(/\.mdx$/, ''),
    },
  }));
}
