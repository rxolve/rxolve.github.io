export const metadata = (
  title: string,
  description: string,
  keywords: string[]
) => {
  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      images: [
        {
          url: "https://rxolve.github.io//og-image.webp",
        },
      ],
    },
  };
};
