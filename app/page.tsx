"use client";

import { motion } from "framer-motion";
import {
  FileKey,
  Unlock,
  Lock,
  Globe,
  ShieldCheck,
  Search,
  ArrowUpRight,
  Gamepad2,
} from "lucide-react";
import Link from "next/link";

const tools = [
  {
    id: "resign",
    href: "/forge?tab=resign",
    icon: FileKey,
    title: "Resign",
    description: "Transfer saves to your account",
  },
  {
    id: "decrypt",
    href: "/forge?tab=decrypt",
    icon: Unlock,
    title: "Decrypt",
    description: "Decrypt your save files",
  },
  {
    id: "encrypt",
    href: "/forge?tab=encrypt",
    icon: Lock,
    title: "Encrypt",
    description: "Encrypt save files for PS4",
  },
  {
    id: "reregion",
    href: "/forge?tab=reregion",
    icon: Globe,
    title: "ReRegion",
    description: "Change game region",
  },
  {
    id: "cheats",
    href: "/forge?tab=cheats",
    icon: ShieldCheck,
    title: "Cheats Lab",
    description: "Explore save modifications",
  },
  {
    id: "cusa",
    href: "/cusa",
    icon: Search,
    title: "Game Database",
    description: "Search games by CUSA ID",
  },
];

export default function Home() {
  return (
    <main className="app-shell">
      <nav className="topbar">
        <div className="topbar-inner">
          <Link href="/" className="brand">
            <div className="brand-icon">
              <Gamepad2 size={23} strokeWidth={1.7} />
            </div>

            <span className="brand-name">QoiaX</span>
          </Link>

          <Link href="/cusa" className="nav-link">
            <Search size={17} />
            <span>Game Database</span>
          </Link>
        </div>
      </nav>

      <section className="workspace">
        <header className="section-header">
          <div>
            <p className="eyebrow">YOUR WORKSPACE</p>
            <h1>Tools</h1>
            <p className="section-description">
              Everything you need, in one place.
            </p>
          </div>
        </header>

        <div className="tools-grid">
          {tools.map((tool, index) => {
            const Icon = tool.icon;

            return (
              <motion.div
                key={tool.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.35,
                  delay: index * 0.045,
                  ease: "easeOut",
                }}
              >
                <Link href={tool.href} className="tool-card">
                  <div className="tool-card-top">
                    <div className="tool-icon">
                      <Icon size={22} strokeWidth={1.6} />
                    </div>

                    <ArrowUpRight
                      size={18}
                      className="tool-arrow"
                      strokeWidth={1.5}
                    />
                  </div>

                  <div className="tool-card-bottom">
                    <h2>{tool.title}</h2>
                    <p>{tool.description}</p>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        <footer className="page-footer">
          <span>QoiaX</span>
          <span className="footer-separator">·</span>
          <span>Simple. Clean. Functional.</span>
        </footer>
      </section>
    </main>
  );
}
