import { ReactNode } from 'react';
import Link from 'next/link';

export function PrevNextButton({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <Link href={href}>
      <button>{children}</button>
    </Link>
  );
}
