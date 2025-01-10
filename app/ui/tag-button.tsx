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
      <button className="outline m-1">
        @{tagItem.tag} {emojiNumber(tagItem.count)}
      </button>
    </Link>
  );
};

export default TagButton;
