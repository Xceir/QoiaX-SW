"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Search, Copy, Check, Database, ExternalLink } from "lucide-react";
import games from "../../public/data/cusa-games.json";
type Game={cusa:string;name:string;region:string};
export default function CusaPage(){
 const [query,setQuery]=useState("");const [copied,setCopied]=useState("");const [region,setRegion]=useState("All");
 const filtered=useMemo(()=>{const q=query.trim().toLowerCase();return (games as Game[]).filter(g=>(region==="All"||g.region===region)&&(!q||g.name.toLowerCase().includes(q)||g.cusa.toLowerCase().includes(q)||g.region.toLowerCase().includes(q))).sort((a,b)=>a.name.localeCompare(b.name));},[query,region]);
 async function copy(id:string){try{await navigator.clipboard.writeText(id);setCopied(id);window.setTimeout(()=>setCopied(v=>v===id?"":v),1400)}catch{setCopied("")}}
 return <main className="subpage-shell"><div className="subpage"><Link href="/" className="back-link"><ArrowLeft size={15}/> Back to QoiaX Wizard</Link><div className="cusa-top"><div><h1 className="page-heading">CUSA Database</h1><p className="page-lead" style={{marginBottom:0}}>Find a PlayStation 4 title ID by name or code.</p></div><span className="count-pill"><Database size={12} style={{display:"inline",verticalAlign:"-2px",marginRight:5}}/>{(games as Game[]).length} indexed entries</span></div>
 <div className="search-box"><Search size={17}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search game name or CUSA ID…" aria-label="Search game name or CUSA ID"/><span style={{fontSize:10,color:"#a0a7b2",whiteSpace:"nowrap"}}>{filtered.length}</span></div>
 <div style={{display:"flex",gap:7,margin:"12px 0 16px",flexWrap:"wrap"}}>{["All","EU","US","JP"].map(r=><button key={r} className={`tab-button ${region===r?"active":""}`} style={{padding:"7px 12px"}} onClick={()=>setRegion(r)}>{r==="All"?"All regions":r}</button>)}</div>
 <section className="surface-card" style={{overflow:"hidden"}}><div className="result-meta"><span>Title matches</span><span>Title ID</span></div>{filtered.length?filtered.map(g=><div className="game-row" key={`${g.cusa}-${g.name}`}><div className="game-mark">PS4</div><div className="game-info"><div className="game-name">{g.name}</div><div className="game-id">{g.cusa}<span className="region-tag">{g.region}</span></div></div><button className="quiet-button" onClick={()=>copy(g.cusa)} aria-label={`Copy ${g.cusa}`}>{copied===g.cusa?<Check size={14}/>:<Copy size={14}/>}<span>{copied===g.cusa?"Copied":"Copy ID"}</span></button></div>):<div className="empty-state">No matching title in the currently installed dataset.<br/>Try a shorter title or search by CUSA code.</div>}</section>
 <div className="notice"><strong style={{color:"#5c6573"}}>Database coverage</strong><br/>This package includes a small starter index of known IDs, not a complete list of every CUSA release. Unknown IDs are not invented. To provide comprehensive coverage, import a verified, regularly updated title-ID dataset into <code>public/data/cusa-games.json</code>. <a href="https://github.com/own4rd/json-games-ps4" target="_blank" rel="noreferrer" style={{display:"inline-flex",alignItems:"center",gap:4,marginTop:6,color:"#5b6677"}}>Example public dataset <ExternalLink size={11}/></a></div>
 </div></main>
}
