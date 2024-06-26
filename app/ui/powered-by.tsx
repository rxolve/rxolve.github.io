import Image from "next/image";
import nextjsIco from "@/public/poweredBy/nextjs.ico";
import picoCssIco from "@/public/poweredBy/pico-css.svg";
import mdxIco from "@/public/poweredBy/mdx.ico";
import githubPageIco from "@/public/poweredBy/github-pages.ico";
import supabaseIco from "@/public/poweredBy/supabase.png";
import gptIco from "@/public/poweredBy/gpt.ico";

const PoweredBy = () => {
  const items = [
    { src: nextjsIco, alt: "Next.js", href: "https://nextjs.org" },
    { src: picoCssIco, alt: "Pico CSS", href: "https://picocss.com" },
    { src: mdxIco, alt: "MDX", href: "https://mdxjs.com" },
    {
      src: githubPageIco,
      alt: "Github Pages",
      href: "https://pages.github.com",
    },
    { src: supabaseIco, alt: "Supabase", href: "https://supabase.io" },
    { src: gptIco, alt: "GPT-4o", href: "https://openai.com" },
  ];

  return (
    <div>
      <small>
        Powered By{" "}
        {items.map((item, index) => (
          <a
            key={index}
            href={item.href}
            target="_blank"
            data-tooltip={item.alt}
          >
            <Image
              src={item.src}
              alt={item.alt}
              width={24}
              height={24}
              style={{
                margin: "0 0.1rem",
              }}
            />
          </a>
        ))}
      </small>
    </div>
  );
};

export default PoweredBy;
