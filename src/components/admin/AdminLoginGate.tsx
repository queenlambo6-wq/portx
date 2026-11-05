import React, { useState } from 'react';
import { useShipping } from '../../context/ShippingContext';
import {
  Lock,
  Mail,
  KeyRound,
  Eye,
  EyeOff,
  ShieldCheck,
  ArrowRight,
  LogOut,
  AlertCircle,
  Globe,
  Sparkles
} from 'lucide-react';
import { Language } from '../../i18n/translations';

export const AdminLoginGate: React.FC = () => {
  const {
    loginAdmin,
    authError,
    setIsAdminMode,
    setActiveView,
    language,
    setLanguage,
    t
  } = useShipping();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [localError, setLocalError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);

    if (!email.trim() || !password) {
      setLocalError(language === 'es' ? 'Por favor ingrese su correo de oficial y contraseña.' : language === 'de' ? 'Bitte dienstliche E-Mail und Passwort eingeben.' : 'Please enter both work email and access password.');
      return;
    }

    loginAdmin(email, password, rememberMe);
  };

  const handleQuickDemoLogin = () => {
    setEmail('admin@portx.com');
    setPassword('PortX2026!');
    loginAdmin('admin@portx.com', 'PortX2026!', true);
  };

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 text-[#18181b]">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        {/* Brand Mark */}
        <div className="flex justify-center mb-3">
          <div className="w-14 h-14 rounded-2xl bg-red-600 text-white flex items-center justify-center shadow-lg shadow-red-600/25 p-3">
            <Lock className="w-7 h-7 text-white" />
          </div>
        </div>

        {/* Language selector pill on login card header */}
        <div className="flex justify-center mb-4">
          <div className="inline-flex items-center bg-white rounded-lg border border-stone-200 p-0.5 shadow-2xs">
            <Globe className="w-3.5 h-3.5 text-stone-400 ml-1.5 mr-1" />
            {(['es', 'en', 'de'] as Language[]).map((lang) => (
              <button
                key={lang}
                onClick={() => setLanguage(lang)}
                className={`text-[11px] font-bold px-2 py-0.5 rounded transition-all cursor-pointer ${
                  language === lang
                    ? 'bg-red-600 text-white shadow-2xs'
                    : 'text-stone-600 hover:text-[#18181b]'
                }`}
              >
                {lang === 'es' ? '🇪🇸 ES' : lang === 'en' ? '🇬🇧 EN' : '🇩🇪 DE'}
              </button>
            ))}
          </div>
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-red-50 text-red-700 border border-red-200 text-xs font-bold uppercase tracking-wider mb-2">
          <ShieldCheck className="w-3.5 h-3.5" />
          {t.adminLoginRequiredBadge}
        </div>

        <h1 className="text-2xl sm:text-3xl font-black text-[#18181b] font-heading tracking-tight">
          {t.adminLoginHeading}
        </h1>
        <p className="mt-1 text-xs text-stone-500 max-w-sm mx-auto">
          {t.adminLoginSubtitle}
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4">
        <div className="bg-white py-8 px-6 sm:px-10 rounded-2xl border border-stone-200 shadow-xl space-y-6">
          
          {/* 1-Click Fast Officer Demo Access */}
          <button
            type="button"
            onClick={handleQuickDemoLogin}
            className="w-full py-2.5 px-3 rounded-xl bg-red-50 hover:bg-red-100 border border-red-200 text-red-700 font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-2xs"
          >
            <Sparkles className="w-4 h-4 text-red-600" />
            <span>Acceso Rápido Oficial (admin@portx.com)</span>
          </button>

          {(authError || localError) && (
            <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold block">{language === 'es' ? 'Acceso Denegado' : language === 'de' ? 'Zugriff Verweigert' : 'Authorization Denied'}</span>
                <span className="text-[11px] mt-0.5 block">{localError || authError}</span>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block text-[#18181b] font-bold mb-1.5">
                {t.officerEmailLabel}
              </label>
              <div className="relative flex items-center">
                <Mail className="w-4 h-4 text-stone-400 absolute left-3 pointer-events-none" />
                <input
                  type="email"
                  required
                  placeholder="admin@portx.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-stone-50 text-[#18181b] pl-9 pr-3 py-2.5 rounded-xl border border-stone-300 focus:border-red-600 focus:bg-white focus:ring-1 focus:ring-red-600 focus:outline-none font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block text-[#18181b] font-bold mb-1.5 flex justify-between items-center">
                <span>{t.passwordLabel}</span>
              </label>
              <div className="relative flex items-center">
                <KeyRound className="w-4 h-4 text-stone-400 absolute left-3 pointer-events-none" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="PortX2026!"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-stone-50 text-[#18181b] pl-9 pr-10 py-2.5 rounded-xl border border-stone-300 focus:border-red-600 focus:bg-white focus:ring-1 focus:ring-red-600 focus:outline-none font-mono"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 text-stone-400 hover:text-stone-600 p-1 cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded text-red-600 focus:ring-red-500"
                />
                <span className="text-stone-600 font-medium text-[11px]">{t.rememberSessionLabel}</span>
              </label>

              <span className="text-[11px] text-stone-400 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                TLS 256-Bit
              </span>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl shadow-md shadow-red-600/25 flex items-center justify-center gap-2 transition-all cursor-pointer mt-2"
            >
              <Lock className="w-4 h-4" />
              <span>{t.verifyLoginBtn}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Security Notice for authorized personnel */}
          <div className="pt-4 border-t border-stone-100 text-center">
            <span className="text-[11px] text-stone-400 flex items-center justify-center gap-1.5 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              {language === 'es' ? 'Acceso restringido a oficiales autorizados PortX (Clave: PortX2026!)' : 'Restricted to authorized PortX operations personnel (Password: PortX2026!)'}
            </span>
          </div>

          <div className="pt-2 text-center">
            <button
              onClick={() => {
                setIsAdminMode(false);
                setActiveView('home');
              }}
              className="text-xs text-stone-500 hover:text-red-600 font-semibold inline-flex items-center gap-1 cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>{t.returnToSiteBtn}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
