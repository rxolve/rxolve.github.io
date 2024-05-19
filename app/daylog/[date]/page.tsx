import dynamic from 'next/dynamic';

type Props = {
  params: {
    date: string;
  };
};

export default function Page({ params }: Props) {
  const Log = dynamic(() =>
    import(`/daylog/${params.date}.mdx`).catch(() => import('/daylog/404.mdx')),
  );

  return (
    <>
      <Log />
    </>
  );
}
