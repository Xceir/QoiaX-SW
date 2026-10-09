"use client"
import { motion } from "framer-motion"
import { FileKey, Unlock, Lock, Globe, ShieldCheck, Search, Zap, Github, Star } from "lucide-react"
import { useState } from "react"

const ops = [
  { id: "resign", icon: FileKey, title: "Resign", fa: "ریزاین", desc: "انتقال سیو به اکانت خودت", grad: "from-violet-600 to-indigo-600" },
  { id: "decrypt", icon: Unlock, title: "Decrypt", fa: "دی‌کریپت", desc: "باز کردن قفل سیو", grad: "from-emerald-500 to-teal-500" },
  { id: "encrypt", icon: Lock, title: "Encrypt", fa: "انکریپت", desc: "رمزنگاری برای PS4", grad: "from-orange-500 to-red-500" },
  { id: "reregion", icon: Globe, title: "ReRegion", fa: "تغییر ریجن", desc: "US ↔ EU ↔ JP", grad: "from-blue-500 to-cyan-400" },
  { id: "cheats", icon: ShieldCheck, title: "Cheats Lab", fa: "چیت لب", desc: "پول و لول نامحدود", grad: "from-fuchsia-600 to-pink-600" },
  { id: "cusa", icon: Search, title: "CUSA DB", fa: "دیتابیس", desc: "16,036 بازی", grad: "from-amber-400 to-yellow-500" },
]

export default function Home() {
  return (
    <main style={{minHeight:\'100vh\', background:\'#050507\', color:\'white\', fontFamily:\'sans-serif\'}}>
      <nav style={{position:\'sticky\', top:0, background:\'rgba(255,255,255,0.06)\', backdropFilter:\'blur(20px)\', borderBottom:\'1px solid rgba(255,255,255,0.1)\', zIndex:50}}>
        <div style={{maxWidth:\'1200px\', margin:\'0 auto\', padding:\'0 24px\', height:\'70px\', display:\'flex\', alignItems:\'center\', justifyContent:\'space-between\'}}>
          <div style={{display:\'flex\', gap:\'12px\', alignItems:\'center\'}}>
            <div style={{width:\'40px\', height:\'40px\', borderRadius:\'12px\', background:\'linear-gradient(to bottom right, #8b5cf6, #06ffa5)\', display:\'flex\', alignItems:\'center\', justifyContent:\'center\', fontWeight:900}}>Q</div>
            <div><div style={{fontWeight:900, letterSpacing:\'2px\'}}>QoiaX-SW</div><div style={{fontSize:\'10px\', opacity:0.5, letterSpacing:\'3px\'}}>NEXUS SAVE FORGE</div></div>
          </div>
          <a href="https://github.com" style={{background:\'white\', color:\'black\', padding:\'8px 20px\', borderRadius:\'999px\', fontWeight:700, display:\'flex\', gap:\'8px\', textDecoration:\'none\'}}><Star size={16}/> Star</a>
        </div>
      </nav>

      <section style={{maxWidth:\'1200px\', margin:\'0 auto\', padding:\'60px 24px 40px\', textAlign:\'center\'}}>
        <div style={{display:\'inline-flex\', gap:\'8px\', background:\'rgba(255,255,255,0.06)\', padding:\'4px 16px\', borderRadius:\'999px\', fontSize:\'12px\', opacity:0.7}}><Zap size={14} color="#06ffa5"/> 100% FREE & OPEN SOURCE</div>
        <h2 style={{fontSize:\'60px\', fontWeight:900, lineHeight:0.9, marginTop:\'24px\'}}>SAVE WIZARD<br/><span style={{background:\'linear-gradient(to right, #8b5cf6, #ec4899, #06ffa5)\', WebkitBackgroundClip:\'text\', color:\'transparent\'}}>REIMAGINED.</span></h2>
        <p style={{opacity:0.6, marginTop:\'16px\'}}>قدرتمندترین ابزار مدیریت سیو PS4 با رابط کاربری از آینده</p>
      </section>

      <section style={{maxWidth:\'1200px\', margin:\'0 auto\', padding:\'0 24px 80px\'}}>
        <div style={{display:\'grid\', gridTemplateColumns:\'repeat(auto-fit, minmax(300px, 1fr))\', gap:\'20px\'}}>
          {ops.map((op,i)=>(
            <motion.div key={op.id} initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:i*0.07}} whileHover={{y:-6}} style={{cursor:\'pointer\', height:\'200px\', background:\'rgba(255,255,255,0.06)\', backdropFilter:\'blur(20px)\', border:\'1px solid rgba(255,255,255,0.1)\', borderRadius:\'28px\', padding:\'28px\', display:\'flex\', flexDirection:\'column\', justifyContent:\'space-between\'}}>
              <div style={{width:\'56px\', height:\'56px\', borderRadius:\'16px\', background:`linear-gradient(to bottom right, var(--tw-gradient-stops))`, display:\'flex\', alignItems:\'center\', justifyContent:\'center\'}} className={`bg-gradient-to-br ${op.grad}`}><op.icon color="white"/></div>
              <div><h3 style={{fontSize:\'22px\', fontWeight:900}}>{op.title} <span style={{opacity:0.3, fontSize:\'14px\'}}>/ {op.fa}</span></h3><p style={{opacity:0.5, fontSize:\'13px\'}}>{op.desc}</p></div>
            </motion.div>
          ))}
        </div>
        <div style={{marginTop:\'40px\', background:\'rgba(255,255,255,0.06)\', borderRadius:\'32px\', padding:\'4px\'}}>
          <div style={{background:\'rgba(0,0,0,0.4)\', borderRadius:\'26px\', padding:\'40px\', border:\'2px dashed rgba(255,255,255,0.1)\', textAlign:\'center\'}}>
            <div style={{width:\'80px\', height:\'80px\', background:\'white\', color:\'black\', borderRadius:\'50%\', display:\'flex\', alignItems:\'center\', justifyContent:\'center\', margin:\'0 auto\'}}><Lock/></div>
            <h3 style={{marginTop:\'16px\', fontWeight:700, fontSize:\'20px\'}}>فایل های سیو رو اینجا رها کن</h3>
            <p style={{opacity:0.4, fontSize:\'13px\'}}>SAVEDATA****** + SAVEDATA******.bin</p>
            <button style={{marginTop:\'24px\', background:\'white\', color:\'black\', padding:\'12px 32px\', borderRadius:\'999px\', fontWeight:900, border:\'none\'}}>انتخاب فایل‌ها</button>
          </div>
        </div>
      </section>
      <footer style={{textAlign:\'center\', opacity:0.2, fontSize:\'12px\', paddingBottom:\'40px\'}}>© 2026 QoiaX-SW • Built for Gamers</footer>
    </main>
  )
}
