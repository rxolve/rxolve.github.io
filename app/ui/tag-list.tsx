import TagButton from "./tag-button";

interface TagListProps {
  isEn?: boolean;
}

const getTags = (isEn: boolean) => {
  return isEn ? require("@/data/tags-en.json") : require("@/data/tags.json");
};

const TagList = async (props: TagListProps) => {
  const { isEn = false } = props;

  const tags = getTags(isEn);

  return (
    <>
      <article>
        {tags?.map((tag: TagItem) => (
          <TagButton key={tag.tag} tagItem={tag} isEn={isEn} />
        ))}
      </article>
    </>
  );
};

export default TagList;
