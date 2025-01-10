import Image from "next/image";
import nextjsIco from "@/public/poweredBy/nextjs.ico";
import picoCssIco from "@/public/poweredBy/pico-css.svg";
import mdxIco from "@/public/poweredBy/mdx.ico";
import githubPageIco from "@/public/poweredBy/github-pages.ico";
import supabaseIco from "@/public/poweredBy/supabase.png";

const PoweredBy = () => {
  const items = [
    { src: nextjsIco, alt: "Next.js", href: "https://nextjs.org" },
    { src: mdxIco, alt: "MDX", href: "https://mdxjs.com" },
    { src: picoCssIco, alt: "Pico CSS", href: "https://picocss.com" },
    {
      src: githubPageIco,
      alt: "Github Pages",
      href: "https://pages.github.com",
    },
    { src: supabaseIco, alt: "Supabase", href: "https://supabase.io" },
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
              className="bg-[#ca848a]"
            />
          </a>
        ))}
      </small>
    </div>
  );
};

export default PoweredBy;
