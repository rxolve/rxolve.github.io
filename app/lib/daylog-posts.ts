import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { PostData } from '../types/post';

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

export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory);

  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.mdx$/, ''),
      },
    };
  });
}
