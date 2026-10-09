"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowUpRight, FileKey2, UnlockKeyhole, LockKeyhole,
  Globe2, SlidersHorizontal, Search, Sparkles, ShieldCheck, Layers3
} from "lucide-react";

const tools = [
  { id: "resign", name: "Save Resigner", description: "Prepare a supported save for another PlayStation profile.", detail: "PROFILE TOOLS", href: "/forge?tab=resign", icon: FileKey2, tone: "blue" },
  { id: "decrypt", name: "Decrypt Save", description: "Choose save files for the decryption workflow.", detail: "FILE TOOLS", href: "/forge?tab=decrypt", icon: UnlockKeyhole, tone: "violet" },
  { id: "encrypt", name: "Encrypt Save", description: "Prepare supported save data for encryption.", detail: "FILE TOOLS", href: "/forge?tab=encrypt", icon: LockKeyhole, tone: "cyan" },
  { id: "reregion", name: "Change Save Region", description: "Use a target-region save as a reference for conversion.", detail: "REGION TOOLS", href: "/forge?tab=reregion", icon: Globe2, tone: "indigo" },
  { id: "cheats", name: "Save Lab", description: "A workspace for save research and preparation.", detail: "WORKSPACE", href: "/forge?tab=cheats", icon: SlidersHorizontal, tone: "slate" },
  { id: "cusa", name: "CUSA Database", description: "Look up PlayStation 4 title identifiers.", detail: "REFERENCE", href: "/cusa", icon: Search, tone: "sky" },
];

export default function Home() {
  return (
    <main className="site-shell">
      <div className="ambient ambient-one" aria-hidden="true" />
      <div className="ambient ambient-two" aria-hidden="true" />
      <header className="topbar">
        <Link className="brand-lockup" href="/" aria-label="QoiaX Wizard home">
          <span className="brand-mark">Q<span>×</span></span>
          <span className="brand-words"><strong>QoiaX</strong><small>WIZARD</small></span>
        </Link>
        <nav className="top-nav" aria-label="Main navigation">
          <a href="#tools">Tools</a>
          <a href="#about">About</a>
          <Link className="nav-cta" href="/forge?tab=resign">Open Wizard <ArrowUpRight size={15} /></Link>
        </nav>
      </header>

      <section className="hero">
        <motion.div className="hero-copy" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .55 }}>
          <div className="eyebrow"><span className="eyebrow-dot" /> PLAYSTATION SAVE TOOLKIT</div>
          <h1>Your saves.<br /><span>Your control.</span></h1>
          <p className="hero-lead">A cleaner workspace for your PlayStation save files.</p>
          <p className="hero-description">Choose a tool, add your files, and follow a focused workflow — all wrapped in a calm, modern interface.</p>
          <div className="hero-actions">
            <Link className="primary-button hero-button" href="/forge?tab=resign">Open Wizard <ArrowUpRight size={17} /></Link>
            <a className="secondary-button hero-button" href="#tools">Explore tools <Layers3 size={16} /></a>
          </div>
          <div className="hero-meta"><span><ShieldCheck size={15} /> Local file selection</span><span className="meta-divider" /><span><Sparkles size={15} /> Minimal by design</span></div>
        </motion.div>
        <motion.div className="hero-visual" initial={{ opacity: 0, scale: .97, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: .7, delay: .12 }}>
          <div className="visual-glow" />
          <div className="preview-window glass-panel">
            <div className="preview-top"><div className="preview-brand"><span className="mini-mark">Q</span><span>QoiaX Wizard</span></div><span className="preview-pill"><span /> Workspace</span></div>
            <div className="preview-welcome"><span className="preview-kicker">YOUR WORKSPACE</span><h2>Ready when<br />you are.</h2><p>Choose a tool to get started.</p></div>
            <div className="preview-tools">
              <div className="preview-tool"><span className="preview-icon blue"><FileKey2 size={18} /></span><span><b>Save Resigner</b><small>Profile tools</small></span><ArrowUpRight size={15} /></div>
              <div className="preview-tool"><span className="preview-icon purple"><Globe2 size={18} /></span><span><b>Change Region</b><small>Region tools</small></span><ArrowUpRight size={15} /></div>
              <div className="preview-tool"><span className="preview-icon cyan"><UnlockKeyhole size={18} /></span><span><b>Decrypt Save</b><small>File tools</small></span><ArrowUpRight size={15} /></div>
            </div>
            <div className="preview-footer"><span className="status-pulse" /> Simple workflows, clear status</div>
          </div>
          <div className="floating-chip chip-one"><span className="chip-icon"><ShieldCheck size={16} /></span><span><b>Focused</b><small>and simple</small></span></div>
          <div className="floating-chip chip-two"><span className="chip-icon blue-chip"><Sparkles size={16} /></span><span><b>PS5-inspired</b><small>glass interface</small></span></div>
        </motion.div>
      </section>

      <section className="tools-section" id="tools">
        <div className="section-heading">
          <div><span className="section-kicker">THE TOOLKIT</span><h2>Everything in one place.</h2><p>Pick the workflow that matches what you need to do.</p></div>
          <span className="tool-count">06 <small>TOOLS</small></span>
        </div>
        <motion.div className="tool-grid" initial="hidden" whileInView="show" viewport={{ once: true, amount: .12 }} variants={{ hidden: {}, show: { transition: { staggerChildren: .055 } } }}>
          {tools.map((tool) => (
            <motion.div key={tool.id} className="tool-card-wrap" variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }} transition={{ duration: .32 }}>
              <Link className="tool-card glass-panel" href={tool.href}>
                <span className={`tool-icon ${tool.tone}`}><tool.icon size={20} strokeWidth={1.7} /></span>
                <span className="tool-copy"><span className="tool-detail">{tool.detail}</span><span className="tool-name">{tool.name}</span><span className="tool-description">{tool.description}</span></span>
                <span className="tool-arrow"><ArrowUpRight size={17} /></span>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <section className="about-strip glass-panel" id="about">
        <div className="about-icon"><ShieldCheck size={22} /></div>
        <div><h3>Designed to stay out of your way.</h3><p>Files are selected in your browser. Actual save processing depends on a compatible processing engine being connected to this build.</p></div>
        <Link href="/forge?tab=resign" className="text-link">Enter workspace <ArrowUpRight size={16} /></Link>
      </section>

      <footer className="site-footer"><span className="footer-brand">QoiaX Wizard</span><span className="footer-dot" /><span>PlayStation save toolkit</span><span className="footer-spacer" /><span className="footer-note">Built with care · QoiaX</span></footer>
    </main>
  );
}
