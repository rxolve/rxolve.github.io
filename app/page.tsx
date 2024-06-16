import { getAllPosts } from "@/lib/posts";
import ArticleList from "./components/article-list";
import TagList from "./components/tag-list";

const Home = () => {
  const allPosts = getAllPosts();
  const tagList = Array.from(
    new Set(allPosts.flatMap((post) => post.tags).filter(Boolean))
  );

  return (
    <main>
      <article>
        <h1>Rxolve to solve 🤔</h1>
        <h6>12년차 개발자의 그저 그렇고 그런 기록 ✍</h6>
        <div>
          <small>
            Made with Next.js, Pico CSS, MDX, Github Pages and GPT-4o 🚀
          </small>
        </div>
        <div>
          💌
          <a target="_blank" href="mailto:rxolve@gmail.com">
            <small style={{ margin: "0 0.3rem" }}>rxolve@gmail.com</small>
          </a>
        </div>
      </article>
      <TagList list={tagList} />
      <ArticleList list={allPosts} />
    </main>
  );
};

export default Home;
