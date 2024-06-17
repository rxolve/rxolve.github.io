import Link from "next/link";

interface TagButtonProps {
  tag: string;
}

const TagButton = ({ tag }: TagButtonProps) => (
  <Link href={`/tag/${tag}`}>
    <button className="outline" style={{ margin: "0.3rem" }}>
      @{tag}
    </button>
  </Link>
);

export default TagButton;
