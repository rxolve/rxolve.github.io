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
  };
}

export function getAllPosts(): PostMetaData[] {
  const fileNames = fs.readdirSync(postsDirectory);
  console.log('fileNames', fileNames);
  const allPostsData = fileNames.map((fileName) => {
    const id = fileName.replace(/\.mdx$/, '');
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    const { data } = matter(fileContents);

    return {
      id,
      title: data.title,
      date: data.date,
    };
  });

  return allPostsData;
}
