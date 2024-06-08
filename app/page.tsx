import { getAllPosts } from '@/lib/posts';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { mdxComponents } from '@/lib/mdx-components';

export default function Home() {
  const posts = getAllPosts('til');

  return (
    <main>
      <article>
        <h1>Resolve to solve 🤔</h1>
        <h6>12년차 개발자의 그저 그렇고 그런 기록 ✍</h6>
        <div>
          <small>Made with Next.js, Vercel, Pico CSS, MDX, and GPT-4o 🚀</small>
        </div>
      </article>
      {posts.map((post) => (
        <article key={post.id}>
          <details>
            <summary>
              {post.date} | {post.title}
            </summary>
            <MDXRemote source={post.content} components={mdxComponents} />
          </details>
        </article>
      ))}
    </main>
  );
}
