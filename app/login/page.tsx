"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Eye, EyeOff, LockKeyhole, ShieldCheck, Sparkles, UserRound, XCircle } from "lucide-react";

const USERNAME = "QoiaX";
const PASSWORD = "mz4466mz";
const AUTH_KEY = "qoiax-wizard-session";
const LANG_KEY = "qoiax-language";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [language, setLanguage] = useState<"en" | "fa">("en");
  const [languageChosen, setLanguageChosen] = useState(false);

  useEffect(() => {
    try { const saved = window.localStorage.getItem(LANG_KEY); if (saved === "fa" || saved === "en") { setLanguage(saved); setLanguageChosen(true); } } catch {}
  }, []);

  function chooseLanguage(next: "en" | "fa") {
    setLanguage(next);
    try { window.localStorage.setItem(LANG_KEY, next); } catch {}
    document.documentElement.lang = next === "fa" ? "fa" : "en";
    document.documentElement.dir = next === "fa" ? "rtl" : "ltr";
    setLanguageChosen(true);
  }

  useEffect(() => {
    try {
      if (window.sessionStorage.getItem(AUTH_KEY) === "ok") router.replace("/");
    } catch {}
  }, [router]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    if (username.trim() !== USERNAME || password !== PASSWORD) {
      setError(language === "fa" ? "نام کاربری یا رمز عبور اشتباهه؛ دوباره امتحان کن." : "Incorrect username or password. Please try again.");
      return;
    }
    setBusy(true);
    try {
      window.sessionStorage.setItem(AUTH_KEY, "ok");
    } catch {}
    window.setTimeout(() => router.replace("/"), 220);
  }

  return (
    <>
    {!languageChosen && <div className="language-gate" dir="ltr" role="dialog" aria-modal="true" aria-labelledby="language-title">
      <div className="language-gate-glow" />
      <div className="language-gate-card">
        <div className="language-gate-brand"><span className="login-brand-mark">Q<span>×</span></span><span><b>QoiaX</b><small>WIZARD</small></span></div>
        <span className="language-kicker">PERSONALIZE YOUR EXPERIENCE</span>
        <h1 id="language-title">Choose your language</h1>
        <p>Select the language for the whole interface. You can change it later.</p>
        <div className="language-options">
          <button className="language-option" onClick={() => chooseLanguage("en")}><span className="language-flag">🇬🇧</span><span className="language-option-copy"><strong>English</strong><small>Continue in English</small></span><span className="language-arrow">↗</span></button>
          <button className="language-option" onClick={() => chooseLanguage("fa")}><span className="language-flag">🇮🇷</span><span className="language-option-copy"><strong>Persian</strong><small>ادامه به فارسی</small></span><span className="language-arrow">↗</span></button>
        </div>
        <div className="language-gate-foot"><span className="language-live-dot"/> ENGLISH / فارسی <span>·</span> QOIAX WIZARD</div>
      </div>
    </div>}
    <main className="login-shell" data-language={language}>
      <div className="login-orb login-orb-a" aria-hidden="true" />
      <div className="login-orb login-orb-b" aria-hidden="true" />
      <header className="login-topbar">
        <a className="login-brand" href="/">
          <span className="login-brand-mark">Q<span>×</span></span>
          <span className="login-brand-text"><b>QoiaX</b><small>WIZARD</small></span>
        </a>
        <span className="login-version"><span /> PRIVATE WORKSPACE</span>
      </header>

      <section className="login-layout">
        <div className="login-story">
          <div className="login-eyebrow"><Sparkles size={14} /> {language === "fa" ? "فضای مدیریت سیو پلی‌استیشن" : "YOUR PLAYSTATION SAVE WORKSPACE"}</div>
          <h1>{language === "fa" ? <>سیوهای تو.<br /><span>انتخاب با تو.</span></> : <>Your saves.<br /><span>Your control.</span></>}</h1>
          <p className="login-lead">{language === "fa" ? "یه فضای مرتب برای ابزارها، فایل‌ها و کارهات." : "A focused space for your tools, files, and workflows."}</p>
          <div className="login-feature-list">
            <div><span className="login-feature-icon"><ShieldCheck size={18} /></span><span><b>{language === "fa" ? "همه‌چیز یک‌جا" : "One private workspace"}</b><small>{language === "fa" ? "یه محیط مرتب برای شروع." : "A clean, focused place to get started."}</small></span></div>
            <div><span className="login-feature-icon"><LockKeyhole size={18} /></span><span><b>{language === "fa" ? "ورود راحت" : "Simple access"}</b><small>{language === "fa" ? "اطلاعات ورودت رو وارد کن و ادامه بده." : "Enter your credentials to continue."}</small></span></div>
          </div>
          <div className="login-decor-card" aria-hidden="true">
            <div className="login-decor-top"><span className="login-mini-logo">Q</span><span>QoiaX Wizard</span><i /></div>
            <div className="login-decor-lines"><span /><span /><span /></div>
            <div className="login-decor-bottom"><span className="login-decor-dot" /> WORKSPACE READY WHEN YOU ARE</div>
          </div>
        </div>

        <div className="login-form-wrap">
          <div className="login-form-card">
            <div className="login-form-icon"><LockKeyhole size={22} /></div>
            <div className="login-form-heading"><span>{language === "fa" ? "خوش برگشتی" : "WELCOME BACK"}</span><h2>{language === "fa" ? "ورود به حساب" : "Sign in"}</h2><p>{language === "fa" ? "اطلاعات ورودت رو وارد کن تا وارد QoiaX بشی." : "Enter your credentials to open QoiaX Wizard."}</p></div>
            <form onSubmit={handleSubmit} noValidate>
              <label className="login-label" htmlFor="username">{language === "fa" ? "نام کاربری" : "Username"}</label>
              <div className={`login-input-wrap ${error ? "has-error" : ""}`}>
                <UserRound size={17} />
                <input id="username" name="username" autoComplete="username" value={username} onChange={(e) => { setUsername(e.target.value); setError(""); }} placeholder={language === "fa" ? "نام کاربری رو وارد کن" : "Enter username"} autoCapitalize="none" spellCheck={false} required />
              </div>
              <label className="login-label login-password-label" htmlFor="password">{language === "fa" ? "رمز عبور" : "Password"}</label>
              <div className={`login-input-wrap ${error ? "has-error" : ""}`}>
                <LockKeyhole size={17} />
                <input id="password" name="password" type={showPassword ? "text" : "password"} autoComplete="current-password" value={password} onChange={(e) => { setPassword(e.target.value); setError(""); }} placeholder={language === "fa" ? "رمز عبور رو وارد کن" : "Enter password"} required />
                <button className="login-eye" type="button" onClick={() => setShowPassword(v => !v)} aria-label={showPassword ? "Hide password" : "Show password"}>{showPassword ? <EyeOff size={17} /> : <Eye size={17} />}</button>
              </div>
              {error && <div className="login-error" role="alert"><XCircle size={17} /><span>{error}</span></div>}
              <button className="login-submit" type="submit" disabled={busy}>{busy ? (language === "fa" ? "در حال ورود…" : "Opening workspace…") : <>{language === "fa" ? "ورود به محیط کار" : "Enter workspace"} <ArrowRight size={17} /></>}</button>
            </form>
            <div className="login-form-foot"><ShieldCheck size={14} /><span>{language === "fa" ? "QoiaX Wizard · فضای شخصی" : "QoiaX Wizard · Personal workspace"}</span></div>
          </div>

        </div>
      </section>
      <footer className="login-footer"><span>QoiaX WIZARD</span><span>{language === "fa" ? "ابزارهای سیو پلی‌استیشن" : "PLAYSTATION SAVE TOOLKIT"}</span><span>{language === "fa" ? "با دقت ساخته شده · QOIAX" : "BUILT WITH CARE · QOIAX"}</span></footer>
    </main>
    </>
  );
}
