import { countEmojiMap } from "@/types/count";
import Link from "next/link";

interface TagButtonProps {
  tagItem: TagItem;
}

const TagButton = ({ tagItem }: TagButtonProps) => {
  if (!tagItem) return null;
  return (
    <Link href={`/tag/${tagItem.tag}`}>
      <button className="outline" style={{ margin: "0.3rem" }}>
        @{tagItem.tag} {countEmojiMap[tagItem.count]}
      </button>
    </Link>
  );
};

export default TagButton;
