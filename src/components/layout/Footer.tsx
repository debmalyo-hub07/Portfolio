import { EmailLink } from "@/components/ui/EmailLink";
import { Icon } from "@/components/ui/Icon";
import { profile } from "@/content/profile";
import { resumeLink } from "@/lib/site-config";

async function buildYear(): Promise<number> {
  "use cache";
  return new Date().getFullYear();
}

const monthYear = (iso: string) =>
  new Intl.DateTimeFormat("en-GB", {
    month: "long",
    year: "numeric",
    timeZone: "Asia/Kolkata",
  }).format(new Date(iso));

/** Footer as a drawing title block: every cell is real information. */
export async function Footer() {
  const year = await buildYear();
  const { contact, location } = profile;
  const cells: { label: string; value: React.ReactNode }[] = [
    { label: "Drawn by", value: profile.name },
    { label: "Role", value: profile.role },
    { label: "Based in", value: `${location.city}, ${location.country} (UTC+05:30)` },
    { label: "CV revision", value: monthYear(resumeLink.updatedISO) },
  ];
  const links = [
    { href: contact.linkedin, label: "LinkedIn", icon: "linkedin" as const },
    { href: contact.whatsapp, label: "WhatsApp", icon: "whatsapp" as const },
  ];

  return (
    <footer className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-8">
      <div className="border border-line/60">
        <dl className="grid grid-cols-2 md:grid-cols-4">
          {cells.map((c) => (
            <div
              key={c.label}
              className="border-b border-line/60 p-4 odd:border-r md:border-r md:last:border-r-0"
            >
              <dt className="text-xs text-ink-3">{c.label}</dt>
              <dd className="mt-1 text-sm font-medium">{c.value}</dd>
            </div>
          ))}
        </dl>
        <div className="flex flex-wrap items-center justify-between gap-4 p-4">
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
            <li>
              <EmailLink
                email={contact.email}
                className="redline inline-flex items-center gap-2 py-1"
              >
                <Icon name="mail" className="size-3.5" />
                {contact.email}
              </EmailLink>
            </li>
            <li>
              <a
                href={`tel:${contact.phone.replace(/\s/g, "")}`}
                className="redline inline-flex items-center gap-2 py-1"
              >
                <Icon name="phone" className="size-3.5" />
                {contact.phone}
              </a>
            </li>
            {links.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="redline inline-flex items-center gap-2 py-1"
                >
                  <Icon name={l.icon} className="size-3.5" />
                  {l.label}
                  <span className="sr-only">(opens in new tab)</span>
                </a>
              </li>
            ))}
          </ul>
          <p className="text-xs text-ink-3">
            © {year} {profile.name}. Press <kbd className="font-mono">Ctrl K</kbd> to jump anywhere.
          </p>
        </div>
      </div>
    </footer>
  );
}
