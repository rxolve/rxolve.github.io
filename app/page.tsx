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
        <h6>💻 매일 정리하는 개발자의</h6>
        <h1>
          그<sub>저</sub> 그<sub>렇고</sub> 그<sub>런</sub>기<sub>록</sub> ✍
        </h1>
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
