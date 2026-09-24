import { Link } from 'react-router-dom';
import logoDark from '../assets/logo-dark.png';

const platformLinks = [
  ['Academic Levels', '/levels'],
  ['Courses', '/courses'],
  ['Practice', '/practice'],
  ['Case Law', '/case-law'],
  ['Resources', '/resources'],
];

const accountLinks = [
  ['Sign Up', '/signup'],
  ['Sign In', '/login'],
  ['Pricing', '/pricing'],
  ['My Subscriptions', '/account/subscriptions'],
  ['Payment History', '/account/payments'],
];

const companyLinks = [
  ['About Us', '/about'],
  ['FAQ', '/faq'],
  ['Contact', '/contact'],
  ['Terms of Service', '/terms'],
  ['Privacy Policy', '/privacy'],
];

const socialLinks = [
  { label: 'Twitter', short: 'X', href: '#' },
  { label: 'LinkedIn', short: 'in', href: '#' },
  { label: 'Instagram', short: 'ig', href: '#' },
];

function FooterLinkColumn({
  title,
  links,
}: {
  title: string;
  links: string[][];
}) {
  return (
    <div>
      <h4 className="mb-5 text-xs font-bold uppercase tracking-[0.18em] text-accent">
        {title}
      </h4>

      <ul className="space-y-3">
        {links.map(([label, href]) => (
          <li key={href}>
            <Link
              to={href}
              className="text-sm text-white/60 transition-colors duration-200 hover:text-white"
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="mt-20 bg-primary text-white">
      <div className="container-shell pt-14 pb-7 md:pt-16">
        {/* Main footer */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-5 lg:gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link
              to="/"
              className="inline-flex items-center gap-3"
              aria-label="SJ Law Learning Platform home"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10">
                <img
                  src={logoDark}
                  alt="SJ Law"
                  className="h-10 w-10 object-contain"
                />
              </div>


            </Link>

            <p className="mt-5 max-w-sm text-sm leading-7 text-white/60">
              Nigeria's premier digital law school — structured,
              subscription-based legal education for serious law students at
              every academic level.
            </p>

            {/* Social links */}
            <div className="mt-6 flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-xs font-semibold text-white/55 transition-all duration-200 hover:border-accent hover:text-accent"
                >
                  {social.short}
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <FooterLinkColumn title="Platform" links={platformLinks} />

          <FooterLinkColumn title="Account" links={accountLinks} />

          <FooterLinkColumn title="Company" links={companyLinks} />
        </div>

        {/* Divider */}
        <div className="my-10 h-px w-full bg-white/10" />

        {/* Bottom */}
        <div className="flex flex-col gap-3 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
          <p className="text-xs text-white/40">
            © 2026 SJ Law Learning Platform. All rights reserved.
          </p>

          <p className="text-xs text-white/40">
            Built for Nigerian law students, by legal educators.
          </p>
        </div>
      </div>
    </footer>
  );
}