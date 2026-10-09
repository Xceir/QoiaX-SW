"use client"
import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, UploadCloud, FileKey, Unlock, Lock, Globe, ShieldCheck } from "lucide-react"

export default function ForgePage() {
  const [tab, setTab] = useState("resign")
  const [psid, setPsid] = useState("")
  const [drag, setDrag] = useState(false)

  const tabs = [
    {id:"resign", label:"Resign", icon:FileKey},
    {id:"decrypt", label:"Decrypt", icon:Unlock},
    {id:"encrypt", label:"Encrypt", icon:Lock},
    {id:"reregion", label:"ReRegion", icon:Globe},
    {id:"cheats", label:"Cheats", icon:ShieldCheck},
  ]

  return (
    <main style={{minHeight:\'100vh\', background:\'#050507\', color:\'white\', paddingBottom:\'60px\'}}>
      <div style={{maxWidth:\'900px\', margin:\'0 auto\', padding:\'24px\'}}>
        <Link href="/" style={{color:\'rgba(255,255,255,0.6)\', textDecoration:\'none\', display:\'flex\', gap:\'8px\', alignItems:\'center\', marginBottom:\'20px\'}}><ArrowLeft size={16}/> بازگشت</Link>
        
        <div style={{display:\'flex\', gap:\'8px\', overflowX:\'auto\', paddingBottom:\'12px\', marginBottom:\'20px\'}}>
          {tabs.map(t=>(
            <button key={t.id} onClick={()=>setTab(t.id)} style={{display:\'flex\', gap:\'8px\', alignItems:\'center\', padding:\'12px 20px\', borderRadius:\'999px\', border:\'1px solid rgba(255,255,255,0.1)\', background: tab===t.id ? \'white\' : \'rgba(255,255,255,0.06)\', color: tab===t.id ? \'black\' : \'white\', fontWeight:700, cursor:\'pointer\', whiteSpace:\'nowrap\'}}>
              <t.icon size={16}/> {t.label}
            </button>
          ))}
        </div>

        <div style={{background:\'rgba(255,255,255,0.06)\', border:\'1px solid rgba(255,255,255,0.1)\', borderRadius:\'28px\', padding:\'28px\', backdropFilter:\'blur(20px)\'}}>
          <h2 style={{fontSize:\'24px\', fontWeight:900, display:\'flex\', gap:\'12px\', alignItems:\'center\', justifyContent:\'center\', marginBottom:\'20px\'}}>
            {tab==="resign" && <><FileKey/> Resign Save</>}
            {tab==="decrypt" && <><Unlock/> Decrypt Save</>}
            {tab==="encrypt" && <><Lock/> Encrypt Save</>}
            {tab==="reregion" && <><Globe/> ReRegion</>}
            {tab==="cheats" && <><ShieldCheck/> UFO Save Editor / Cheats</>}
          </h2>

          {tab!=="decrypt" && tab!=="cheats" && (
            <div style={{marginBottom:\'16px\'}}>
              <label style={{opacity:0.6, fontSize:\'14px\'}}>PlayStation ID (username)</label>
              <input value={psid} onChange={e=>setPsid(e.target.value)} placeholder="Ex: QoiaX-YT" style={{width:\'100%\', height:\'48px\', background:\'rgba(0,0,0,0.3)\', border:\'1px solid rgba(255,255,255,0.1)\', borderRadius:\'12px\', padding:\'0 16px\', color:\'white\', marginTop:\'8px\'}}/>
            </div>
          )}

          {tab==="cheats" && <p style={{opacity:0.6, textAlign:\'center\', marginBottom:\'20px\'}}>فایل سیو رمزنگاری شده رو آپلود کن، سیستم اتوماتیک دیکریپت میکنه و چیت های سازگار رو نشون میده. (12 بازی پشتیبانی شده)</p>}

          <div onDragOver={(e)=>{e.preventDefault(); setDrag(true)}} onDragLeave={()=>setDrag(false)} onDrop={(e)=>{e.preventDefault(); setDrag(false); alert(\'فایل دریافت شد! (در نسخه واقعی اینجا پردازش میشه)\')}} style={{border:\'2px dashed\', borderColor: drag ? \'#8b5cf6\' : \'rgba(255,255,255,0.2)\', background: drag ? \'rgba(139,92,246,0.1)\' : \'rgba(0,0,0,0.2)\', borderRadius:\'24px\', padding:\'40px\', textAlign:\'center\', cursor:\'pointer\'}}>
            <UploadCloud size={48} style={{margin:\'0 auto\', opacity:0.8}}/>
            <div style={{fontWeight:700, marginTop:\'16px\'}}> Drag encrypted saves here or click to select</div>
            <div style={{opacity:0.4, fontSize:\'13px\', marginTop:\'8px\'}}>Pairs file ex: SAVEDATAxxxx + SAVEDATAxxxx.bin</div>
            <input type="file" style={{display:\'none\'}} id="fileup"/>
            <label htmlFor="fileup" style={{display:\'inline-block\', marginTop:\'16px\', background:\'white\', color:\'black\', padding:\'10px 24px\', borderRadius:\'999px\', fontWeight:900, cursor:\'pointer\'}}>انتخاب فایل</label>
          </div>

          <button onClick={()=>alert(`در نسخه واقعی با PSN ID: ${psid} پردازش انجام میشه!`)} style={{width:\'100%\', height:\'56px\', background:\'linear-gradient(to right, #8b5cf6, #06ffa5)\', border:\'none\', borderRadius:\'16px\', color:\'white\', fontWeight:900, fontSize:\'18px\', marginTop:\'20px\', cursor:\'pointer\'}}>▶ Execute - اجرا</button>
        </div>

        <p style={{textAlign:\'center\', opacity:0.3, fontSize:\'12px\', marginTop:\'20px\'}}>QoiaX-SW • 100% Free • Obsidian Nexus Theme • No server needed for UI</p>
      </div>
    </main>
  )
}
