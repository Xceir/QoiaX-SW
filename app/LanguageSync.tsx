"use client";
import { useEffect } from "react";

const translations: Record<string,string> = {
  "Tools":"ابزارها", "About":"درباره", "Tutorial":"آموزش", "Open Wizard":"ورود به Wizard", "Explore tools":"دیدن ابزارها",
  "Your saves.":"سیوهای تو.", "Your control.":"انتخاب با تو.", "A cleaner workspace for your PlayStation save files.":"یه محیط مرتب برای مدیریت سیوهای پلی‌استیشن.",
  "Choose a tool, add your files, and follow a focused workflow — all wrapped in a calm, modern interface.":"ابزار موردنظرت رو انتخاب کن، فایل‌هات رو اضافه کن و مرحله‌به‌مرحله پیش برو؛ همه‌چیز توی یه محیط ساده و مدرن.",
  "THE TOOLKIT":"ابزارها", "Everything in one place.":"همه‌چیز یه‌جا.", "Pick the workflow that matches what you need to do.":"بسته به کاری که داری، ابزار مناسب رو انتخاب کن.",
  "Save Resigner":"تغییر حساب سیو", "Decrypt Save":"Decrypt Save", "Encrypt Save":"Encrypt Save", "Change Save Region":"تغییر ریجن سیو", "Save Lab":"Save Lab", "CUSA Database":"CUSA Database", "Tutorial & Field Guide":"راهنمای آموزشی",
  "PROFILE TOOLS":"ابزارهای حساب", "FILE TOOLS":"ابزارهای فایل", "REGION TOOLS":"ابزارهای ریجن", "WORKSPACE":"محیط کار", "REFERENCE":"مرجع", "KNOWLEDGE CENTER":"مرکز آموزش",
  "Prepare a supported save for another PlayStation profile.":"آماده‌سازی سیو سازگار برای یک پروفایل دیگر پلی‌استیشن.", "Choose save files for the decryption workflow.":"فایل‌های موردنیاز برای Decrypt رو انتخاب کن.", "Prepare supported save data for encryption.":"آماده‌سازی فایل سازگار برای Encrypt.", "Look up PlayStation 4 title identifiers.":"شناسه‌ی بازی‌های پلی‌استیشن ۴ رو پیدا کن.",
  "Designed to stay out of your way.":"ساده و بی‌دردسر طراحی شده.", "Choose a tool to manage files, inspect save metadata, and search the CUSA database.":"ابزار موردنظرت رو انتخاب کن، اطلاعات فایل رو ببین یا توی CUSA Database جست‌وجو کن.", "Enter workspace":"ورود به محیط کار", "Back to QoiaX Wizard":"برگشت به QoiaX Wizard",
  "Find a PlayStation 4 title ID by name or code.":"شناسه‌ی بازی PS4 رو با اسم یا کدش پیدا کن.", "All regions":"همه‌ی ریجن‌ها", "Title matches":"نتایج بازی", "Title ID":"شناسه‌ی بازی", "Copy ID":"کپی شناسه", "Copied":"کپی شد", "No matching title in the currently installed dataset.":"توی دیتابیس فعلی نتیجه‌ای پیدا نشد.",
  "Search game name or CUSA ID…":"اسم بازی یا CUSA ID رو جست‌وجو کن…", "Database coverage":"پوشش دیتابیس", "Start here":"از اینجا شروع کن", "START HERE":"از اینجا شروع کن", "CORE CONCEPTS":"مفاهیم اصلی", "FILE WORKFLOWS":"کار با فایل‌ها", "ACCOUNT WORKFLOW":"مراحل حساب", "TECHNICAL BASICS":"مفاهیم فنی",
  "Search tutorials…":"جست‌وجو توی آموزش‌ها…", "Search lessons":"جست‌وجوی درس‌ها", "Read the guide":"مطالعه‌ی راهنما", "Learn more":"بیشتر بدون", "No results found":"چیزی پیدا نشد",
  "Engine link unavailable":"موتور متصل نیست", "OFFLINE · STANDBY":"آفلاین · آماده‌باش", "ONLINE · READY":"آنلاین · آماده", "SYSTEM CORE":"هسته‌ی سیستم", "PLAYSTATION SAVE TOOLKIT":"ابزار مدیریت سیو پلی‌استیشن"
};

export default function LanguageSync(){
 useEffect(()=>{
  const apply=()=>{
   let lang="en"; try { lang=localStorage.getItem("qoiax-language") || "en"; } catch {}
   document.documentElement.lang=lang==="fa"?"fa":"en";
   document.documentElement.dir=lang==="fa"?"rtl":"ltr";
   document.documentElement.classList.toggle("lang-fa",lang==="fa");
   document.documentElement.classList.toggle("lang-en",lang!=="fa");
   if(lang!=="fa") return;
   const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);
   const nodes:Text[]=[]; while(walker.nextNode()) nodes.push(walker.currentNode as Text);
   nodes.forEach(node=>{const value=node.nodeValue; if(!value) return; const key=value.trim(); if(translations[key]) node.nodeValue=value.replace(key,translations[key]);});
   document.querySelectorAll<HTMLInputElement|HTMLTextAreaElement>("input[placeholder],textarea[placeholder]").forEach(el=>{const key=el.placeholder;if(translations[key])el.placeholder=translations[key];});
  };
  apply(); const observer=new MutationObserver(()=>apply()); observer.observe(document.body,{childList:true,subtree:true,characterData:true});
  window.addEventListener("storage",apply); return ()=>{observer.disconnect();window.removeEventListener("storage",apply)};
 },[]);
 return null;
}
