type Props = {
  params: {
    date: string;
  };
};

export default function Post({ params }: Props) {
  return (
    <>
      <div>{params.date} mdx</div>
    </>
  );
}
