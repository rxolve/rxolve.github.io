import { emojiNumber } from "@/lib/emoji-number";
import Link from "next/link";

interface TagButtonProps {
  tagItem: TagItem;
}

const TagButton = ({ tagItem }: TagButtonProps) => {
  if (!tagItem) return null;
  return (
    <Link href={`/tag/${tagItem.tag}`}>
      <button className="outline" style={{ margin: "0.3rem" }}>
        @{tagItem.tag} {emojiNumber(tagItem.count)}
      </button>
    </Link>
  );
};

export default TagButton;
