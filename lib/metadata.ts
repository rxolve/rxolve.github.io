export const metadata = (
  title: string,
  description: string,
  keywords: string[]
) => {
  const metadata = {
    title,
    description,
    keywords: keywords.join(", "),
    openGraph: {
      title,
      description,
      images: [
        {
          url: "https://rxolve.github.io/og-image.png",
        },
      ],
    },
    other: {
      "application/ld+json": JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: title,
        description,
        keywords: keywords.join(", "),
      }),
    },
  };

  return metadata;
};
