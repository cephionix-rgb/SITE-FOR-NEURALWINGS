import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Apps Script web app owned by hello@neuralwings.org, so notifications and the
// requester's confirmation are sent from that address. Source and deploy steps
// live in /apps-script.
const APPS_SCRIPT_URL =
  'https://script.google.com/macros/s/AKfycby2YLrcFi1GNiz5RcCxJAEy_2Tn-Gdw7laGC5RCssGkU-03ZeX4AlcGlpN8e5F6qhEK/exec';

interface DemoFormProps {
  /** 'dark' for placement on the near-black CTA band, 'light' on white pages. */
  variant?: 'light' | 'dark';
  /** Show a Return Home button once submitted — used by the standalone page. */
  showReturnHome?: boolean;
}

const styles = {
  light: {
    label: 'text-zinc-500',
    field:
      'w-full px-4 py-3 bg-slate-50 border border-zinc-200 rounded-xl text-sm font-medium text-zinc-900 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 transition',
    option: '',
    heading: 'text-zinc-900',
    body: 'text-zinc-600',
    note: 'text-zinc-400',
    successIconWrap: 'bg-green-100',
    successIcon: 'text-green-600',
    submit:
      'w-full py-4 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white rounded-xl font-bold font-sans shadow-lg shadow-sky-500/30 hover:shadow-sky-500/50 hover:-translate-y-1 transition active:translate-y-0 flex items-center justify-center gap-2',
  },
  dark: {
    label: 'text-zinc-400',
    field:
      'w-full px-4 py-3 bg-white/[0.05] border border-white/10 rounded-xl text-sm font-medium text-white placeholder-zinc-500 outline-none focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/20 transition',
    option: 'bg-[#0b1220] text-white',
    heading: 'text-white',
    body: 'text-zinc-400',
    note: 'text-zinc-600',
    successIconWrap: 'bg-emerald-500/15',
    successIcon: 'text-emerald-400',
    submit:
      'w-full py-4 text-white rounded-xl font-bold font-sans shadow-[0_0_40px_-8px_rgba(34,211,238,0.5)] hover:shadow-[0_0_55px_-4px_rgba(34,211,238,0.7)] hover:-translate-y-1 transition active:translate-y-0 flex items-center justify-center gap-2',
  },
};

export function DemoForm({ variant = 'light', showReturnHome = false }: DemoFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();
  const s = styles[variant];

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;

    const params = new URLSearchParams({
      name:     (form.elements.namedItem('name')     as HTMLInputElement).value,
      phone:    (form.elements.namedItem('phone')    as HTMLInputElement).value,
      email:    (form.elements.namedItem('email')    as HTMLInputElement).value,
      fto:      (form.elements.namedItem('fto')      as HTMLInputElement).value,
      location: (form.elements.namedItem('location') as HTMLInputElement).value,
      branches: (form.elements.namedItem('branches') as HTMLSelectElement).value,
    });

    // Hidden iframe + form — params survive Google's redirect chain
    const iframe = document.createElement('iframe');
    iframe.name = 'hidden_iframe';
    iframe.style.display = 'none';
    document.body.appendChild(iframe);

    const hiddenForm = document.createElement('form');
    hiddenForm.method = 'GET';
    hiddenForm.action = APPS_SCRIPT_URL;
    hiddenForm.target = 'hidden_iframe';
    hiddenForm.style.display = 'none';

    params.forEach((value, key) => {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = key;
      input.value = value;
      hiddenForm.appendChild(input);
    });

    document.body.appendChild(hiddenForm);
    hiddenForm.submit();

    setTimeout(() => {
      document.body.removeChild(hiddenForm);
      document.body.removeChild(iframe);
    }, 5000);

    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="text-center py-10">
        <div className={`w-20 h-20 ${s.successIconWrap} rounded-full flex items-center justify-center mx-auto mb-6`}>
          <svg className={`w-10 h-10 ${s.successIcon}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className={`text-2xl font-black font-heading ${s.heading} tracking-tight mb-2`}>Request Received</h2>
        <p className={`${s.body} font-medium text-sm mb-6 max-w-[380px] mx-auto`}>
          Your FTO information has reached our team, and a confirmation is on its way to your inbox. We will
          contact you shortly to schedule your personalised walkthrough.
        </p>
        {showReturnHome && (
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-zinc-900 text-white rounded-xl font-bold text-sm hover:-translate-y-1 transition shadow-lg shadow-zinc-900/20"
          >
            Return Home
          </button>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 text-left">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="space-y-1.5">
          <label className={`text-[11px] font-bold ${s.label} uppercase tracking-widest pl-1`}>Name</label>
          <input required type="text" name="name" className={s.field} placeholder="Capt. John Doe" />
        </div>
        <div className="space-y-1.5">
          <label className={`text-[11px] font-bold ${s.label} uppercase tracking-widest pl-1`}>Phone</label>
          <input required type="tel" name="phone" className={s.field} placeholder="+91 99999 99999" />
        </div>
      </div>

      <div className="space-y-1.5">
        <label className={`text-[11px] font-bold ${s.label} uppercase tracking-widest pl-1`}>Work Email</label>
        <input required type="email" name="email" className={s.field} placeholder="name@fto.com" />
      </div>

      <div className="space-y-1.5">
        <label className={`text-[11px] font-bold ${s.label} uppercase tracking-widest pl-1`}>
          FTO Organization Name
        </label>
        <input required type="text" name="fto" className={s.field} placeholder="e.g. Apex Aviation Academy" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="space-y-1.5">
          <label className={`text-[11px] font-bold ${s.label} uppercase tracking-widest pl-1`}>Location / Base</label>
          <input required type="text" name="location" className={s.field} placeholder="e.g. Karnal Airfield" />
        </div>
        <div className="space-y-1.5">
          <label className={`text-[11px] font-bold ${s.label} uppercase tracking-widest pl-1`}>Total Branches</label>
          <select name="branches" className={`${s.field} appearance-none`}>
            <option className={s.option}>1 (Single Base)</option>
            <option className={s.option}>2 - 4</option>
            <option className={s.option}>5+</option>
          </select>
        </div>
      </div>

      <div className="pt-4">
        <button
          type="submit"
          className={s.submit}
          style={variant === 'dark' ? { background: 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)' } : undefined}
        >
          Complete Request
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>
      </div>

      <p className={`text-center text-[10px] ${s.note} font-medium mt-4`}>
        By submitting, your details are sent securely to our team at hello@neuralwings.org, and you will receive a
        confirmation email.
      </p>
    </form>
  );
}
