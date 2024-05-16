import { PrevNextButton } from '../ui/prev-next-button';
import Content from './content.mdx';

const Page = () => {
  return (
    <div>
      <Content />
      <PrevNextButton href="/page-2">Next</PrevNextButton>
    </div>
  );
};

export default Page;
