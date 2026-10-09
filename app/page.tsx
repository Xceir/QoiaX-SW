"use client"
import { motion } from "framer-motion"
import { FileKey, Unlock, Lock, Globe, ShieldCheck, Search, Zap, Star } from "lucide-react"
import Link from "next/link"

const ops = [
  { id: "resign", href:"/forge?tab=resign", icon: FileKey, title: "Resign", fa: "ریزاین", desc: "انتقال سیو به اکانت خودت", grad: "from-violet-600 to-indigo-600" },
  { id: "decrypt", href:"/forge?tab=decrypt", icon: Unlock, title: "Decrypt", fa: "دی‌کریپت", desc: "باز کردن قفل سیو", grad: "from-emerald-500 to-teal-500" },
  { id: "encrypt", href:"/forge?tab=encrypt", icon: Lock, title: "Encrypt", fa: "انکریپت", desc: "رمزنگاری برای PS4", grad: "from-orange-500 to-red-500" },
  { id: "reregion", href:"/forge?tab=reregion", icon: Globe, title: "ReRegion", fa: "تغییر ریجن", desc: "US ↔ EU ↔ JP", grad: "from-blue-500 to-cyan-400" },
  { id: "cheats", href:"/forge?tab=cheats", icon: ShieldCheck, title: "Cheats Lab", fa: "چیت لب", desc: "پول و لول نامحدود", grad: "from-fuchsia-600 to-pink-600" },
  { id: "cusa", href:"/cusa", icon: Search, title: "CUSA DB", fa: "دیتابیس", desc: "16,036 بازی", grad: "from-amber-400 to-yellow-500" },
]

export default function Home() {
  return (
    <main style={{minHeight:"100vh", background:"#050507", color:"white"}}>
      <nav style={{position:"sticky", top:"0", background:"rgba(255,255,255,0.06)", backdropFilter:"blur(20px)", borderBottom:"1px solid rgba(255,255,255,0.1)", zIndex:50}}>
        <div style={{maxWidth:"1200px", margin:"0 auto", padding:"0 24px", height:"70px", display:"flex", alignItems:"center", justifyContent:"space-between"}}>
          <div style={{display:"flex", gap:"12px", alignItems:"center"}}>
            <div style={{width:"40px", height:"40px", borderRadius:"12px", background:"linear-gradient(to bottom right, #8b5cf6, #06ffa5)", display:"flex", alignItems:"center", justifyContent:"center", fontWeight:900}}>Q</div>
            <div><div style={{fontWeight:900, letterSpacing:"2px"}}>QoiaX-SW</div><div style={{fontSize:"10px", opacity:0.5, letterSpacing:"3px"}}>NEXUS SAVE FORGE</div></div>
          </div>
          <Link href="/cusa" style={{background:"white", color:"black", padding:"8px 20px", borderRadius:"999px", fontWeight:700, textDecoration:"none", display:"flex", gap:"8px", alignItems:"center"}}><Star size={16}/> CUSA Search</Link>
        </div>
      </nav>
      <section style={{maxWidth:"1200px", margin:"0 auto", padding:"60px 24px 40px", textAlign:"center"}}>
        <div style={{display:"inline-flex", gap:"8px", background:"rgba(255,255,255,0.06)", padding:"4px 16px", borderRadius:"999px", fontSize:"12px", opacity:0.7}}><Zap size={14} color="#06ffa5"/> 100% FREE & OPEN SOURCE</div>
        <h2 style={{fontSize:"60px", fontWeight:900, lineHeight:0.9, marginTop:"24px"}}>SAVE WIZARD<br/><span style={{background:"linear-gradient(to right, #8b5cf6, #ec4899, #06ffa5)", WebkitBackgroundClip:"text", color:"transparent"}}>REIMAGINED.</span></h2>
        <p style={{opacity:0.6, marginTop:"16px"}}>روی هر کارت بزن تا وارد ابزار شی - سریع‌تر و زیباتر از UFO</p>
      </section>
      <section style={{maxWidth:"1200px", margin:"0 auto", padding:"0 24px 80px"}}>
        <div style={{display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(300px, 1fr))", gap:"20px"}}>
          {ops.map((op,i)=>(
            <Link key={op.id} href={op.href} style={{textDecoration:"none", color:"white"}}>
              <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:i*0.07}} whileHover={{y:-6}} style={{cursor:"pointer", height:"200px", background:"rgba(255,255,255,0.06)", backdropFilter:"blur(20px)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:"28px", padding:"28px", display:"flex", flexDirection:"column", justifyContent:"space-between"}}>
                <div style={{width:"56px", height:"56px", borderRadius:"16px", display:"flex", alignItems:"center", justifyContent:"center"}} className={`bg-gradient-to-br ${op.grad}`}><op.icon color="white"/></div>
                <div><h3 style={{fontSize:"22px", fontWeight:900}}>{op.title} <span style={{opacity:0.3, fontSize:"14px"}}>/ {op.fa}</span></h3><p style={{opacity:0.5, fontSize:"13px"}}>{op.desc}</p></div>
              </motion.div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}
