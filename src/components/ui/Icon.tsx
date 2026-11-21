import type { SVGProps } from "react";

const paths = {
  sun: "M12 4V2M12 22v-2M4 12H2M22 12h-2M5.6 5.6 4.2 4.2M19.8 19.8l-1.4-1.4M5.6 18.4l-1.4 1.4M19.8 4.2l-1.4 1.4M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z",
  moon: "M20.5 14.2A8.5 8.5 0 0 1 9.8 3.5a8.5 8.5 0 1 0 10.7 10.7Z",
  menu: "M3 7h18M3 12h18M3 17h18",
  close: "M6 6l12 12M18 6 6 18",
  arrowUpRight: "M7 17 17 7M8 7h9v9",
  arrowDown: "M12 5v14M6 13l6 6 6-6",
  download: "M12 4v11M7 10l5 5 5-5M5 20h14",
  mail: "M3 6h18v12H3zM3 7l9 6 9-6",
  copy: "M9 9h11v11H9zM5 15H4V4h11v1",
  search: "M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14ZM20 20l-4-4",
  hash: "M5 9h14M4 15h14M10 3 8 21M16 3l-2 18",
  phone:
    "M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z",
  linkedin:
    "M4 9h4v11H4zM6 4.5a2 2 0 1 1 0 4 2 2 0 0 1 0-4ZM10 9h3.8v1.6c.6-1 1.9-1.9 3.7-1.9 3.3 0 3.5 2.2 3.5 5V20h-4v-5.5c0-1.3 0-2.6-1.7-2.6S14 13.2 14 14.4V20h-4z",
  whatsapp:
    "M4 20l1.2-4A8 8 0 1 1 8 18.8L4 20ZM9 8.5c0 3.5 3 6.5 6.5 6.5l1-1.5-2-1-1 1a4 4 0 0 1-3-3l1-1-1-2L9 8.5Z",
} as const;

export type IconName = keyof typeof paths;

export function Icon({ name, ...props }: { name: IconName } & SVGProps<SVGSVGElement>) {
  const filled = name === "linkedin";
  return (
    <svg
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      fill={filled ? "currentColor" : "none"}
      stroke={filled ? "none" : "currentColor"}
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d={paths[name]} />
    </svg>
  );
}
