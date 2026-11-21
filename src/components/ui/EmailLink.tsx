"use client";

import type { AnchorHTMLAttributes } from "react";
import { mailtoHref, openEmail } from "@/lib/email";

type Props = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "onClick"> & { email: string };

/** href stays mailto (works without JS); click opens Gmail compose on desktop, mail app on phones. */
export function EmailLink({ email, children, ...rest }: Props) {
  return (
    <a
      {...rest}
      href={mailtoHref(email)}
      onClick={(e) => {
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
        e.preventDefault();
        openEmail(email);
      }}
    >
      {children}
    </a>
  );
}
