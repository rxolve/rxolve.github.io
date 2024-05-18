import Log from '/daylog/240101.mdx';

type Props = {
  params: {
    date: string;
  };
};

export default function Post({ params }: Props) {
  return (
    <>
      <div>{params.date} mdx</div>
      <Log />
    </>
  );
}
