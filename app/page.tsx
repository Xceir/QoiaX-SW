"use client"

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, FileKey2, UnlockKeyhole, LockKeyhole, Globe2, SlidersHorizontal, Search, ShieldCheck } from "lucide-react";

const tools = [
  { id: "resign", name: "Save Resigner", description: "Prepare a save for another profile.", detail: "RESIGN", href: "/forge?tab=resign", icon: FileKey2 },
  { id: "decrypt", name: "Decrypt Save", description: "Inspect supported encrypted save files.", detail: "DECRYPT", href: "/forge?tab=decrypt", icon: UnlockKeyhole },
  { id: "encrypt", name: "Encrypt Save", description: "Save preparation workflow.", detail: "ENCRYPT", href: "/forge?tab=encrypt", icon: LockKeyhole },
  { id: "reregion", name: "Region Finder", description: "Compare regional title identifiers.", detail: "REREGION", href: "/forge?tab=reregion", icon: Globe2 },
  { id: "cheats", name: "Save Lab", description: "A workspace for save research and tools.", detail: "SAVE LAB", href: "/forge?tab=cheats", icon: SlidersHorizontal },
  { id: "cusa", name: "CUSA Database", description: "Search PlayStation 4 title IDs.", detail: "DATABASE", href: "/cusa", icon: Search },
];

export default function Home() {
  return <main className="site-shell">
    <div className="ambient ambient-one" aria-hidden="true"/><div className="ambient ambient-two" aria-hidden="true"/>
    <section className="home-wrap">
      <motion.div className="brand-title" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .55 }}>QoiaX Wizard</motion.div>
      <div className="title-rule"/>
      <motion.section className="tool-grid" aria-label="Tools" initial="hidden" animate="show" variants={{hidden:{},show:{transition:{staggerChildren:.065}}}}>
        {tools.map((tool) => <motion.div key={tool.id} variants={{hidden:{opacity:0,y:12},show:{opacity:1,y:0}}} transition={{duration:.32}} className="tool-card-wrap">
          <Link className="tool-card glass-panel" href={tool.href}>
            <span className="tool-icon"><tool.icon size={19} strokeWidth={1.7}/></span>
            <span className="tool-copy"><span className="tool-detail">{tool.detail}</span><span className="tool-name">{tool.name}</span><span className="tool-description">{tool.description}</span></span>
            <span className="tool-arrow"><ArrowUpRight size={17}/></span>
          </Link>
        </motion.div>)}
      </motion.section>
      <footer className="site-footer"><span>QoiaX Wizard</span><span className="footer-dot"/> <span>PlayStation save toolkit</span></footer>
    </section>
  </main>;
}
