import CodeBlock from "../app/ui/code-block";
import dynamic from "next/dynamic";
const Mermaid = dynamic(() => import("@/app/ui/mermaid"), { ssr: false });

export const mdxComponents = {
  code({ node, inline, className, children, ...props }: any) {
    const match = /language-(\w+)/.exec(className || "");
    return !inline && match ? (
      <CodeBlock
        value={String(children).replace(/\n$/, "")}
        language={match[1]}
        {...props}
      />
    ) : (
      <code className={className} {...props}>
        {children}
      </code>
    );
  },
  Mermaid,
};
