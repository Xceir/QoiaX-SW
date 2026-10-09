"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Eye, EyeOff, LockKeyhole, ShieldCheck, Sparkles, UserRound, XCircle } from "lucide-react";

const USERNAME = "QoiaX";
const PASSWORD = "mz4466mz";
const AUTH_KEY = "qoiax-wizard-session";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    try {
      if (window.sessionStorage.getItem(AUTH_KEY) === "ok") router.replace("/");
    } catch {}
  }, [router]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    if (username.trim() !== USERNAME || password !== PASSWORD) {
      setError("Username یا Password اشتباه است. دوباره تلاش کن.");
      return;
    }
    setBusy(true);
    try {
      window.sessionStorage.setItem(AUTH_KEY, "ok");
    } catch {}
    window.setTimeout(() => router.replace("/"), 220);
  }

  return (
    <main className="login-shell">
      <div className="login-orb login-orb-a" aria-hidden="true" />
      <div className="login-orb login-orb-b" aria-hidden="true" />
      <header className="login-topbar">
        <a className="login-brand" href="/QoiaX-SW/">
          <span className="login-brand-mark">Q<span>×</span></span>
          <span className="login-brand-text"><b>QoiaX</b><small>WIZARD</small></span>
        </a>
        <span className="login-version"><span /> PRIVATE WORKSPACE</span>
      </header>

      <section className="login-layout">
        <div className="login-story">
          <div className="login-eyebrow"><Sparkles size={14} /> YOUR PLAYSTATION SAVE WORKSPACE</div>
          <h1>Your saves.<br /><span>Your control.</span></h1>
          <p className="login-lead">A focused space for your tools, files, and workflows.</p>
          <div className="login-feature-list">
            <div><span className="login-feature-icon"><ShieldCheck size={18} /></span><span><b>One private workspace</b><small>A clean, focused place to get started.</small></span></div>
            <div><span className="login-feature-icon"><LockKeyhole size={18} /></span><span><b>Simple access</b><small>Enter your credentials to continue.</small></span></div>
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
            <div className="login-form-heading"><span>WELCOME BACK</span><h2>Sign in</h2><p>Enter your credentials to open QoiaX Wizard.</p></div>
            <form onSubmit={handleSubmit} noValidate>
              <label className="login-label" htmlFor="username">Username</label>
              <div className={`login-input-wrap ${error ? "has-error" : ""}`}>
                <UserRound size={17} />
                <input id="username" name="username" autoComplete="username" value={username} onChange={(e) => { setUsername(e.target.value); setError(""); }} placeholder="Enter username" autoCapitalize="none" spellCheck={false} required />
              </div>
              <label className="login-label login-password-label" htmlFor="password">Password</label>
              <div className={`login-input-wrap ${error ? "has-error" : ""}`}>
                <LockKeyhole size={17} />
                <input id="password" name="password" type={showPassword ? "text" : "password"} autoComplete="current-password" value={password} onChange={(e) => { setPassword(e.target.value); setError(""); }} placeholder="Enter password" required />
                <button className="login-eye" type="button" onClick={() => setShowPassword(v => !v)} aria-label={showPassword ? "Hide password" : "Show password"}>{showPassword ? <EyeOff size={17} /> : <Eye size={17} />}</button>
              </div>
              {error && <div className="login-error" role="alert"><XCircle size={17} /><span>{error}</span></div>}
              <button className="login-submit" type="submit" disabled={busy}>{busy ? "Opening workspace…" : <>Enter workspace <ArrowRight size={17} /></>}</button>
            </form>
            <div className="login-form-foot"><ShieldCheck size={14} /><span>QoiaX Wizard · Personal workspace</span></div>
          </div>
          <p className="login-disclaimer">This is a client-side access screen, not secure authentication.</p>
        </div>
      </section>
      <footer className="login-footer"><span>QoiaX WIZARD</span><span>PLAYSTATION SAVE TOOLKIT</span><span>BUILT WITH CARE · QOIAX</span></footer>
    </main>
  );
}
