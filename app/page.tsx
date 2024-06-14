import ArticleList from "./components/article-list";

const Home = () => {
  return (
    <main>
      <article>
        <h1>Rxolve to solve 🤔</h1>
        <h6>12년차 개발자의 그저 그렇고 그런 기록 ✍</h6>
        <div>
          <small>Made with Next.js, Vercel, Pico CSS, MDX, and GPT-4o 🚀</small>
        </div>
      </article>
      <ArticleList />
    </main>
  );
};

export default Home;
