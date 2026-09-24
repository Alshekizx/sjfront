import { usePageContent } from '@/lib/content';
import { Link } from 'react-router-dom';
import { Scale, Mail, Phone, MapPin } from 'lucide-react';
import logoDark from '@/assets/ref2.png';

export default function Footer() {
  const content = usePageContent('contact');
  return (
    <footer className="bg-[var(--primary)] text-white">
      <div className="page-shell py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex mb-4">
              <img src={logoDark} alt="SJ Law Academy" className="h-10 w-50 items-center brightness-200 invert" />
              <div>
                <p className="font-serif font-semibold text-lg leading-none">SJ Law Academy</p>
                <p className="text-[10px] font-mono text-white/50 tracking-widest uppercase mt-0.5">Digital Law School</p>
              </div>
            </div>
            <p className="text-sm text-white/70 leading-relaxed mb-6">
              A premium digital learning platform built for Nigerian law students — structured, rigorous and designed around the way law is actually practised and examined.
            </p>
            <div className="flex items-center gap-3">
              
            </div>
          </div>

          {/* Platform */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white/50 mb-4">Platform</h4>
            <nav className="space-y-2.5">
              <FooterLink to="/academic-levels">Academic Levels</FooterLink>
              <FooterLink to="/courses">Courses</FooterLink>
              <FooterLink to="/practice">Practice Questions</FooterLink>
              <FooterLink to="/case-law">Case Law Library</FooterLink>
              <FooterLink to="/resources">Learning Resources</FooterLink>
              <FooterLink to="/pricing">Pricing & Plans</FooterLink>
            </nav>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white/50 mb-4">Company</h4>
            <nav className="space-y-2.5">
              <FooterLink to="/about">About Us</FooterLink>
              <FooterLink to="/faq">FAQ</FooterLink>
              <FooterLink to="/contact">Contact & Support</FooterLink>
              <FooterLink to="/terms">Terms of Service</FooterLink>
              <FooterLink to="/privacy">Privacy Policy</FooterLink>
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white/50 mb-4">Contact</h4>
            <div className="space-y-3 text-sm text-white/70">
              <div className="flex items-start gap-2.5">
                <Mail size={14} className="mt-0.5 shrink-0 text-[var(--accent)]" />
                <span>{content.email}</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Phone size={14} className="mt-0.5 shrink-0 text-[var(--accent)]" />
                <span>{content.phone}</span>
              </div>
              <div className="flex items-start gap-2.5">
                <MapPin size={14} className="mt-0.5 shrink-0 text-[var(--accent)]" />
                <span>{content.location}</span>
              </div>
            </div>
            <div className="mt-6 p-3.5 rounded-lg bg-white/5 border border-white/10">
              <p className="text-xs font-medium text-white/80 mb-1">3-Day Free Trial</p>
              <p className="text-xs text-white/50 mb-3">No payment required to get started.</p>
              <Link to="/signup" className="block text-center py-2 text-xs font-semibold bg-[var(--accent)] text-[var(--primary)] rounded-md hover:bg-[#D4A830] transition-colors">
                Start Free Trial →
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/40">
          <p>© {new Date().getFullYear()} SJ Law Academy. All rights reserved.</p>
          <div className="flex items-center gap-1">
            <Scale size={12} />
            <span>Powered by Supabase · Payments by Paystack</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <Link to={to} className="block text-sm text-white/70 hover:text-white transition-colors">
      {children}
    </Link>
  );
}

function SocialLink({ href, icon }: { href: string; icon: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="w-8 h-8 rounded-full bg-white/10 hover:bg-[var(--accent)] flex items-center justify-center transition-colors"
    >
      {icon}
    </a>
  );
}
