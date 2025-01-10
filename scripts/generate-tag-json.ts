import fs from "fs";
import path from "path";
import { getAllPosts } from "@/lib/posts";

const generateTagJson = async (isEn: boolean) => {
  const allPosts = await getAllPosts({ isEn });
  const tagItemList: TagItem[] = [];

  for (const post of allPosts) {
    if (!post.tags) continue;
    for (const tag of post.tags) {
      const index = tagItemList.findIndex((item) => item.tag === tag);
      if (index === -1) {
        tagItemList.push({ tag, count: 1 });
      } else {
        tagItemList[index].count += 1;
      }
    }
  }

  const sortedTagItemList = tagItemList.sort((a, b) => b.count - a.count);
  console.log(sortedTagItemList);

  const fileName = isEn ? "tags-en.json" : "tags.json";
  const jsonPath = path.join(process.cwd(), "gen-data", fileName);
  fs.writeFileSync(jsonPath, JSON.stringify(sortedTagItemList));
  console.log("tags.json 생성 완료!");
};

generateTagJson(false);
generateTagJson(true);
