import Link from "next/link";

interface TagButtonProps {
  tag: string;
}

const TagButton = ({ tag }: TagButtonProps) => (
  <Link href={`/tag/${tag}`}>
    <button className="outline" style={{ margin: "0 0.5rem" }}>
      @{tag}
    </button>
  </Link>
);

export default TagButton;
