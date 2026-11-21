export const mailtoHref = (email: string) => `mailto:${email}`;

/** Gmail web compose window with the address pre-filled. */
export const gmailComposeUrl = (email: string) =>
  `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email)}`;

/**
 * Phones/tablets: mailto (opens the Gmail app or the default mail app).
 * Desktop: Gmail compose in a new tab, since many desktops have no mail app wired to mailto.
 */
export function openEmail(email: string): void {
  if (matchMedia("(pointer: coarse)").matches) {
    location.href = mailtoHref(email);
  } else {
    window.open(gmailComposeUrl(email), "_blank", "noopener,noreferrer");
  }
}
