import Link from 'next/link';
import { ReactNode } from 'react';

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
