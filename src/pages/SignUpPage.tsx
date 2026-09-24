import { useState, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import logoLight from '../assets/logo-light.png';

const universities = [
  'University of Lagos (UNILAG)',
  'University of Ibadan (UI)',
  'Obafemi Awolowo University (OAU)',
  'University of Nigeria, Nsukka (UNN)',
  'Ahmadu Bello University (ABU)',
  'University of Benin (UNIBEN)',
  'Lagos State University (LASU)',
  'Babcock University',
  'Covenant University',
  'University of Abuja',
  'Nigerian Law School',
  'Other',
];

const academicLevels = ['100 Level', '200 Level', '300 Level', '400 Level', '500 Level'];

function PasswordStrength({ password }: { password: string }) {
  const checks = [
    { label: 'At least 8 characters', ok: password.length >= 8 },
    { label: 'One uppercase letter', ok: /[A-Z]/.test(password) },
    { label: 'One number', ok: /[0-9]/.test(password) },
  ];
  const score = checks.filter(c => c.ok).length;
  const colours = ['bg-red-400', 'bg-amber-400', 'bg-green-500'];
  const labels = ['Weak', 'Fair', 'Strong'];

  return (
    <div className="mt-2 space-y-1.5">
      <div className="flex gap-1">
        {[0, 1, 2].map(i => (
          <div key={i} className={`flex-1 h-1 rounded-full ${i < score ? colours[score - 1] : 'bg-[#DDD8CC]'} transition-all`} />
        ))}
      </div>
      {password && <p className={`text-xs ${score === 3 ? 'text-green-600' : score === 2 ? 'text-amber-600' : 'text-red-500'}`}>{labels[score - 1] || 'Weak'}</p>}
      <div className="flex flex-wrap gap-x-4 gap-y-1">
        {checks.map(c => (
          <div key={c.label} className={`flex items-center gap-1 text-xs ${c.ok ? 'text-green-600' : 'text-[#6B7280]'}`}>
            {c.ok ? '✓' : '○'} {c.label}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function SignUpPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    university: '',
    level: '',
    terms: false,
    privacy: false,
  });

  const update = (field: string, value: string | boolean) => setForm(f => ({ ...f, [field]: value }));

  const validateStep1 = () => {
    if (!form.fullName.trim()) return 'Please enter your full name.';
    if (!form.email.includes('@')) return 'Please enter a valid email address.';
    if (form.phone && form.phone.length < 10) return 'Please enter a valid phone number.';
    return '';
  };

  const validateStep2 = () => {
    if (form.password.length < 8) return 'Password must be at least 8 characters.';
    if (form.password !== form.confirmPassword) return 'Passwords do not match.';
    if (!form.university) return 'Please select your university.';
    if (!form.level) return 'Please select your academic level.';
    if (!form.terms || !form.privacy) return 'Please accept the Terms of Service and Privacy Policy.';
    return '';
  };

  const handleNext = () => {
    const err = validateStep1();
    if (err) { setError(err); return; }
    setError('');
    setStep(2);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const err = validateStep2();
    if (err) { setError(err); return; }
    setLoading(true);
    try {
      await login(form.email, form.password);
      navigate('/dashboard');
    } catch {
      setError('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <div className="navy-gradient hidden lg:flex flex-col justify-between p-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />
        <div className="relative">
          <img src={logoLight} alt="SJ Law" className="w-20 h-20 object-contain mb-6" />
          <h2 className="text-3xl font-serif font-bold text-white mb-3">Start your legal<br />education journey</h2>
          <p className="text-white/60 text-sm leading-relaxed">Join thousands of Nigerian law students accessing premium, structured legal education on SJ Law Platform.</p>
        </div>
        <div className="relative space-y-5">
          {[
            ['3-Day Free Trial', 'Full access to the platform with no payment required.'],
            ['Independent Level Subscriptions', 'Pay only for the academic level you need, when you need it.'],
            ['Secure Payments via Paystack', 'All transactions are processed safely and verifiably.'],
          ].map(([title, desc]) => (
            <div key={title} className="flex gap-3">
              <div className="w-5 h-5 rounded-full bg-[#C9A84C] flex items-center justify-center shrink-0 mt-0.5">
                <svg className="w-3 h-3 text-[#0F2044]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <div className="text-sm font-semibold text-white">{title}</div>
                <div className="text-xs text-white/50">{desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col justify-center px-6 py-12 bg-[#F5F3EE]">
        <div className="max-w-md w-full mx-auto">
          <div className="lg:hidden flex items-center gap-3 mb-8">
            <img src={logoLight} alt="SJ Law" className="w-10 h-10 object-contain" />
            <div>
              <div className="font-serif font-bold text-[#0F2044]">SJ Law</div>
              <div className="text-[10px] text-[#C9A84C] tracking-widest uppercase">Learning Platform</div>
            </div>
          </div>

          {/* Step indicators */}
          <div className="flex items-center gap-3 mb-8">
            {[1, 2].map(s => (
              <div key={s} className="flex items-center gap-2">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors
                  ${step >= s ? 'bg-[#0F2044] text-white' : 'bg-[#DDD8CC] text-[#6B7280]'}`}>
                  {step > s ? '✓' : s}
                </div>
                <span className={`text-xs ${step >= s ? 'text-[#0F2044] font-medium' : 'text-[#6B7280]'}`}>
                  {s === 1 ? 'Personal Info' : 'Account Setup'}
                </span>
                {s < 2 && <div className="w-8 h-px bg-[#DDD8CC]" />}
              </div>
            ))}
          </div>

          <h1 className="text-3xl font-serif font-bold text-[#0F2044] mb-1">
            {step === 1 ? 'Create Your Account' : 'Account Setup'}
          </h1>
          <p className="text-sm text-[#6B7280] mb-8">
            {step === 1 ? 'Start your 3-day free trial  --  no credit card required.' : 'Set your password and academic details.'}
          </p>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          {step === 1 ? (
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-[#0F2044] mb-1.5">Full Name *</label>
                <input
                  value={form.fullName}
                  onChange={e => update('fullName', e.target.value)}
                  placeholder="e.g. Adaeze Okonkwo"
                  className="w-full px-4 py-3 bg-white border border-[#DDD8CC] rounded-lg text-sm focus:outline-none focus:border-[#0F2044] transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#0F2044] mb-1.5">Email Address *</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={e => update('email', e.target.value)}
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 bg-white border border-[#DDD8CC] rounded-lg text-sm focus:outline-none focus:border-[#0F2044] transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#0F2044] mb-1.5">Phone Number</label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={e => update('phone', e.target.value)}
                  placeholder="+234 800 000 0000"
                  className="w-full px-4 py-3 bg-white border border-[#DDD8CC] rounded-lg text-sm focus:outline-none focus:border-[#0F2044] transition-colors"
                />
              </div>
              <button
                onClick={handleNext}
                className="w-full py-3.5 bg-[#0F2044] text-white font-semibold rounded-lg hover:bg-[#1a3666] transition-colors"
              >
                Continue
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-[#0F2044] mb-1.5">Password *</label>
                <input
                  type="password"
                  value={form.password}
                  onChange={e => update('password', e.target.value)}
                  placeholder="Create a strong password"
                  className="w-full px-4 py-3 bg-white border border-[#DDD8CC] rounded-lg text-sm focus:outline-none focus:border-[#0F2044] transition-colors"
                />
                <PasswordStrength password={form.password} />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#0F2044] mb-1.5">Confirm Password *</label>
                <input
                  type="password"
                  value={form.confirmPassword}
                  onChange={e => update('confirmPassword', e.target.value)}
                  placeholder="Repeat your password"
                  className="w-full px-4 py-3 bg-white border border-[#DDD8CC] rounded-lg text-sm focus:outline-none focus:border-[#0F2044] transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#0F2044] mb-1.5">University / Institution *</label>
                <select
                  value={form.university}
                  onChange={e => update('university', e.target.value)}
                  className="w-full px-4 py-3 bg-white border border-[#DDD8CC] rounded-lg text-sm focus:outline-none focus:border-[#0F2044] transition-colors"
                >
                  <option value="">Select your university</option>
                  {universities.map(u => <option key={u} value={u}>{u}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#0F2044] mb-1.5">Current Academic Level *</label>
                <select
                  value={form.level}
                  onChange={e => update('level', e.target.value)}
                  className="w-full px-4 py-3 bg-white border border-[#DDD8CC] rounded-lg text-sm focus:outline-none focus:border-[#0F2044] transition-colors"
                >
                  <option value="">Select your level</option>
                  {academicLevels.map(l => <option key={l} value={l}>{l}</option>)}
                </select>
              </div>
              <div className="space-y-2.5">
                {[
                  { key: 'terms', label: <>I agree to the <Link to="/terms" className="text-[#C9A84C] hover:underline">Terms of Service</Link></> },
                  { key: 'privacy', label: <>I agree to the <Link to="/privacy" className="text-[#C9A84C] hover:underline">Privacy Policy</Link></> },
                ].map(item => (
                  <label key={item.key} className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={form[item.key as 'terms' | 'privacy']}
                      onChange={e => update(item.key, e.target.checked)}
                      className="w-4 h-4 rounded border-[#DDD8CC] accent-[#0F2044]"
                    />
                    <span className="text-sm text-[#6B7280]">{item.label}</span>
                  </label>
                ))}
              </div>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => { setStep(1); setError(''); }}
                  className="px-5 py-3.5 border border-[#DDD8CC] text-[#0F2044] font-medium rounded-lg hover:bg-white transition-colors text-sm"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 py-3.5 bg-[#0F2044] text-white font-semibold rounded-lg hover:bg-[#1a3666] transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <><svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>Creating account…</>
                  ) : 'Create Account  --  Start Free Trial'}
                </button>
              </div>
            </form>
          )}

          <p className="text-center text-sm text-[#6B7280] mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-[#C9A84C] font-semibold hover:text-[#0F2044] transition-colors">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
