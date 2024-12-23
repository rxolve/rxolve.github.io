import { getAllPosts } from "@/lib/posts";
import ArticleList from "./ui/article-list";
import TagList from "./ui/tag-list";
import VisitorCount from "./ui/visitor-count";
import PoweredBy from "./ui/powered-by";
import { metadata } from "@/lib/metadata";
import { langEn } from "@/language/en";
import { LangMap, langKo } from "@/language/ko";
import { HomeProps } from "@/type/home.type";

const Home = async ({ isEn }: HomeProps) => {
  const allPosts = await getAllPosts({ isEn });
  const langMap: LangMap = isEn ? langEn : langKo;

  return (
    <main>
      <article>
        <h6>{langMap.homeSubTitle}</h6>
        <h1>
          {langMap.homeTitle.t1}
          <sub>{langMap.homeTitle.t2}</sub> {langMap.homeTitle.t3}
          <sub>{langMap.homeTitle.t4}</sub> {langMap.homeTitle.t5}
          <sub>{langMap.homeTitle.t6}</sub> {langMap.homeTitle.t7}
          <sub>{langMap.homeTitle.t8}</sub> {langMap.homeTitle.t9}
        </h1>
        <PoweredBy />
        <div>
          <small>💌</small>
          <small className="mx-1">
            <a target="_blank" href="mailto:rxolve@gmail.com">
              rxolve@gmail.com
            </a>
          </small>
          <VisitorCount />
        </div>
      </article>
      <TagList isEn={isEn} />
      <ArticleList list={allPosts.slice(0, 30)} />
    </main>
  );
};

export default Home;

export const generateMetadata = async () => {
  return metadata("그그그기", "Rxolve to solve", ["그그그기", "rxolve"]);
};
