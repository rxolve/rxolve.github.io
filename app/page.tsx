import { getAllPosts } from "@/lib/posts";
import ArticleList from "./components/article-list";
import TagList from "./components/tag-list";
import VisitorCount from "./components/visitor-count";
import PoweredBy from "./components/powered-by";

const Home = async () => {
  const allPosts = getAllPosts();

  return (
    <main>
      <article>
        <h1>Rxolve to solve 🤔</h1>
        <h6>정리하는 개발자의 그저 그렇고 그런 기록 ✍</h6>
        <PoweredBy />
        <div>
          <small>💌</small>
          <small style={{ margin: "0 0.2rem" }}>
            <a target="_blank" href="mailto:rxolve@gmail.com">
              rxolve@gmail.com
            </a>
          </small>
          <VisitorCount />
        </div>
      </article>
      <TagList list={allPosts} />
      <ArticleList list={allPosts} />
    </main>
  );
};

export default Home;
