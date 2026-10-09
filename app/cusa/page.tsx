"use client"
import { useState } from "react"
import { motion } from "framer-motion"
import { Search, Copy, ArrowLeft } from "lucide-react"
import Link from "next/link"

const GAMES = [
  { name: "Assassins Creed Valhalla", cusa: "CUSA18500", region: "EU", vers: "3 versao(oes) - EU, JP, US", img: "https://cdn.cloudflare.steamstatic.com/steam/apps/2208920/header.jpg" },
  { name: "Assassins Creed Odyssey", cusa: "CUSA09311", region: "EU", vers: "5 versao(oes) - EU, JP, US", img: "https://cdn.cloudflare.steamstatic.com/steam/apps/812140/header.jpg" },
  { name: "DOOM Eternal", cusa: "CUSA02092", region: "EU", vers: "EU - CUSA02092", img: "https://cdn.cloudflare.steamstatic.com/steam/apps/782330/header.jpg" },
  { name: "DOOM 2016", cusa: "CUSA02085", region: "US", vers: "US - CUSA02085", img: "https://cdn.cloudflare.steamstatic.com/steam/apps/379720/header.jpg" },
  { name: "God of War Ragnarok", cusa: "CUSA34384", region: "EU", vers: "EU, US, JP", img: "https://cdn.cloudflare.steamstatic.com/steam/apps/2322010/header.jpg" },
  { name: "Grand Theft Auto V", cusa: "CUSA00411", region: "EU", vers: "EU - CUSA00411", img: "https://cdn.cloudflare.steamstatic.com/steam/apps/3240220/header.jpg" },
  { name: "The Witcher 3", cusa: "CUSA00527", region: "EU", vers: "EU - CUSA00527", img: "https://cdn.cloudflare.steamstatic.com/steam/apps/292030/header.jpg" },
  { name: "Elden Ring", cusa: "CUSA28863", region: "EU", vers: "EU - CUSA28863", img: "https://cdn.cloudflare.steamstatic.com/steam/apps/1245620/header.jpg" }
]

export default function CusaPage() {
  const [q, setQ] = useState("")
  const filtered = GAMES.filter((g) => g.name.toLowerCase().includes(q.toLowerCase()) || g.cusa.toLowerCase().includes(q.toLowerCase()))
  return (
    <main style={{minHeight:"100vh", background:"#050507", color:"white", paddingBottom:"60px"}}>
      <div style={{maxWidth:"800px", margin:"0 auto", padding:"24px"}}>
        <Link href="/" style={{color:"rgba(255,255,255,0.6)", textDecoration:"none", display:"flex", gap:"8px", alignItems:"center", marginBottom:"20px"}}><ArrowLeft size={16}/> بازگشت به خانه</Link>
        <div style={{textAlign:"center", marginBottom:"32px"}}>
          <h1 style={{fontSize:"42px", fontWeight:900, display:"flex", gap:"12px", justifyContent:"center", alignItems:"center"}}><Search/> Search CUSA</h1>
          <div style={{fontSize:"32px", fontWeight:900, marginTop:"8px"}}>16,036</div>
          <div style={{opacity:0.5, letterSpacing:"2px", fontSize:"12px"}}>TOTAL GAMES</div>
        </div>
        <div style={{position:"relative", marginBottom:"20px"}}>
          <Search style={{position:"absolute", left:"16px", top:"50%", transform:"translateY(-50%)", opacity:0.4}}/>
          <input value={q} onChange={(e)=>setQ(e.target.value)} placeholder="Assassins Creed یا DOOM یا CUSA..." style={{width:"100%", height:"56px", background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:"16px", paddingLeft:"48px", color:"white", fontSize:"16px", outline:"none"}}/>
        </div>
        <div style={{background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:"20px", overflow:"hidden"}}>
          <div style={{padding:"12px 16px", opacity:0.5, fontSize:"13px", borderBottom:"1px solid rgba(255,255,255,0.1)"}}>{filtered.length} resultados</div>
          {filtered.map((g,i)=>(
            <motion.div key={g.cusa} initial={{opacity:0}} animate={{opacity:1}} transition={{delay:i*0.05}} style={{display:"flex", gap:"16px", alignItems:"center", padding:"16px", borderBottom:"1px solid rgba(255,255,255,0.06)"}}>
              <img src={g.img} alt={g.name} style={{width:"64px", height:"64px", borderRadius:"12px", objectFit:"cover"}}/>
              <div style={{flex:1}}>
                <div style={{fontWeight:700}}>{g.name}</div>
                <div style={{opacity:0.5, fontSize:"12px"}}>{g.vers}</div>
                <div style={{fontFamily:"monospace", fontSize:"13px", marginTop:"4px"}}>{g.cusa} <span style={{background: g.region==="EU" ? "#3b82f6" : g.region==="US" ? "#ef4444" : "#f59e0b", color:"white", padding:"2px 8px", borderRadius:"999px", fontSize:"10px", marginLeft:"8px"}}>{g.region}</span></div>
              </div>
              <button onClick={()=>{navigator.clipboard.writeText(g.cusa); alert("کپی شد: "+g.cusa)}} style={{background:"rgba(255,255,255,0.1)", border:"1px solid rgba(255,255,255,0.1)", color:"white", padding:"8px 16px", borderRadius:"999px", cursor:"pointer"}}><Copy size={14}/> Copy</button>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  )
}
