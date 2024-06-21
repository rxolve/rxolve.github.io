import { getAllPosts } from "@/lib/posts";
import ArticleList from "./components/article-list";
import TagList from "./components/tag-list";
import { checkVisitorCount } from "@/lib/visitor-count";

const Home = async () => {
  const allPosts = getAllPosts();

  const visitorCount = await checkVisitorCount();

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
          <small>💌</small>
          <small style={{ margin: "0 0.2rem" }}>
            <a target="_blank" href="mailto:rxolve@gmail.com">
              rxolve@gmail.com
            </a>
          </small>
          <small style={{ margin: "0 0.2rem" }}>🎉 {visitorCount}</small>
        </div>
      </article>
      <TagList list={allPosts} />
      <ArticleList list={allPosts} />
    </main>
  );
};

export default Home;
