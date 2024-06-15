import Link from "next/link";
import TagButton from "./tag-button";

interface TagListProps {
  list?: string[];
}

const TagList = ({ list }: TagListProps) => {
  return (
    <>
      <article>{list?.map((tag) => <TagButton key={tag} tag={tag} />)}</article>
    </>
  );
};

export default TagList;
