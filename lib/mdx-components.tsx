import CodeBlock from "../app/components/code-block";

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
};
