import TagButton from "./tag-button";
import { PostData } from "@/types/post";

interface TagListProps {
  list: PostData[];
}

const TagList = ({ list }: TagListProps) => {
  const tagItemList: TagItem[] = [];

  for (const post of list) {
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

  return (
    <>
      <article>
        {sortedTagItemList?.map((tagItem) => (
          <TagButton key={tagItem.tag} tagItem={tagItem} />
        ))}
      </article>
    </>
  );
};

export default TagList;
