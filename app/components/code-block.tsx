import { FC } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialOceanic } from 'react-syntax-highlighter/dist/cjs/styles/prism';

interface TProps {
  language: string;
  value: string;
}

const CodeBlock: FC<TProps> = ({ language, value }) => {
  return (
    <SyntaxHighlighter language={language} style={materialOceanic}>
      {value}
    </SyntaxHighlighter>
  );
};

export default CodeBlock;
