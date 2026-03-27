const InstagramIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const XIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
    <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
  </svg>
);

const LinkedinIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const FacebookIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const socialLinks = [
  { icon: <InstagramIcon />, href: "#", label: "Instagram" },
  { icon: <XIcon />, href: "#", label: "X (Twitter)" },
  { icon: <LinkedinIcon />, href: "#", label: "LinkedIn" },
  { icon: <FacebookIcon />, href: "#", label: "Facebook" },
];

const footerLinks = {
  program: [
    { label: "Overview", href: "#about" },
    { label: "Results", href: "#results" },
    { label: "The Method", href: "#process" },
    { label: "Apply Now", href: "#apply" },
  ],
  company: [
    { label: "About Us", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Contact", href: "#apply" },
  ],
  legal: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "Earnings Disclaimer", href: "#" },
  ],
};

export default function Footer() {
  return (
    <footer id="footer" className="bg-footer pt-20 pb-8 px-6 lg:px-12">
      <div className="max-w-6xl mx-auto">
        {/* Big Logo */}
        <div className="text-center mb-16">
          <h3 className="font-heading text-3xl md:text-7xl lg:text-8xl font-bold text-gold/20 tracking-wider">
            FORGE & ASCEND
          </h3>
        </div>

        {/* 3-Column Links */}
        <div className="grid md:grid-cols-3 gap-10 pb-12 border-b border-border/50">
          <div>
            <h4 className="font-body text-cream text-sm font-semibold uppercase tracking-wider mb-5">
              Program
            </h4>
            <ul className="space-y-3">
              {footerLinks.program.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="font-body text-muted text-sm hover:text-cream transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-body text-cream text-sm font-semibold uppercase tracking-wider mb-5">
              Company
            </h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="font-body text-muted text-sm hover:text-cream transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-body text-cream text-sm font-semibold uppercase tracking-wider mb-5">
              Legal
            </h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="font-body text-muted text-sm hover:text-cream transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-8">
          <p className="font-body text-muted/60 text-sm">
            © {new Date().getFullYear()} Forge & Ascend. All rights reserved.
          </p>

          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="w-10 h-10 rounded-full border border-border flex items-center justify-center
                  text-muted hover:text-gold hover:border-gold/50 transition-all duration-300"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
