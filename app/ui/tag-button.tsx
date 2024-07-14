import { emojiNumber } from "@/lib/emoji-number";
import Link from "next/link";

interface TagButtonProps {
  tagItem: TagItem;
  isEn?: boolean;
}

const TagButton = (props: TagButtonProps) => {
  const { tagItem, isEn = false } = props;
  if (!tagItem) return null;
  return (
    <Link href={isEn ? `en/tag/${tagItem.tag}` : `/tag/${tagItem.tag}`}>
      <button className="outline" style={{ margin: "0.3rem" }}>
        @{tagItem.tag} {emojiNumber(tagItem.count)}
      </button>
    </Link>
  );
};

export default TagButton;
