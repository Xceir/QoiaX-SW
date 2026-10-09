"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft, ArrowUpRight, FileKey2, UnlockKeyhole, LockKeyhole, Globe2,
  SlidersHorizontal, UploadCloud, File as FileIcon, X, Check, ShieldCheck, CircleHelp,
  ChevronRight, Sparkles, RotateCcw
} from "lucide-react";

type Tab = "resign" | "decrypt" | "encrypt" | "reregion" | "cheats";
const tabs: { id: Tab; label: string; icon: typeof FileKey2; title: string; description: string; short: string }[] = [
  { id: "resign", label: "Resign", icon: FileKey2, title: "Save Resigner", description: "Prepare a supported save for another PlayStation profile.", short: "PROFILE" },
  { id: "decrypt", label: "Decrypt", icon: UnlockKeyhole, title: "Decrypt Save", description: "Select the encrypted save files required by the workflow.", short: "FILE TOOLS" },
  { id: "encrypt", label: "Encrypt", icon: LockKeyhole, title: "Encrypt Save", description: "Select save data for the supported encryption workflow.", short: "FILE TOOLS" },
  { id: "reregion", label: "ReRegion", icon: Globe2, title: "Change Save Region", description: "Use a save from the destination region as a reference for your original save.", short: "REGION" },
  { id: "cheats", label: "Save Lab", icon: SlidersHorizontal, title: "Save Lab", description: "A workspace for save-file research and preparation.", short: "WORKSPACE" },
];

function formatSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

export default function ForgePage() {
  const authRouter = useRouter();
  useEffect(() => {
    try { if (window.sessionStorage.getItem("qoiax-wizard-session") !== "ok") authRouter.replace("/login"); }
    catch { authRouter.replace("/login"); }
  }, [authRouter]);

  const [tab, setTab] = useState<Tab>("resign");
  const [files, setFiles] = useState<File[]>([]);
  const [targetFiles, setTargetFiles] = useState<File[]>([]);
  const [originalFiles, setOriginalFiles] = useState<File[]>([]);
  const [psid, setPsid] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"info" | "success" | "error">("info");
  const [dragTarget, setDragTarget] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const targetInputRef = useRef<HTMLInputElement>(null);
  const originalInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const value = new URLSearchParams(window.location.search).get("tab");
    if (tabs.some((t) => t.id === value)) setTab(value as Tab);
  }, []);

  const active = tabs.find((t) => t.id === tab)!;
  const addFiles = (current: File[], incoming: FileList | null, setter: (next: File[]) => void) => {
    if (!incoming) return;
    setter([...current, ...Array.from(incoming)].filter((file, index, all) =>
      all.findIndex((item) => item.name === file.name && item.size === file.size) === index));
    setMessage("");
  };
  const acceptGeneral = (incoming: FileList | null) => addFiles(files, incoming, setFiles);
  const acceptTarget = (incoming: FileList | null) => addFiles(targetFiles, incoming, setTargetFiles);
  const acceptOriginal = (incoming: FileList | null) => addFiles(originalFiles, incoming, setOriginalFiles);

  const resetCurrent = () => {
    setFiles([]); setTargetFiles([]); setOriginalFiles([]); setPsid(""); setMessage("");
    if (inputRef.current) inputRef.current.value = "";
    if (targetInputRef.current) targetInputRef.current.value = "";
    if (originalInputRef.current) originalInputRef.current.value = "";
  };

  const runCheck = () => {
    setMessageType("error");
    if (tab === "resign" && !psid.trim()) {
      setMessage("Enter your PlayStation Online ID before continuing."); return;
    }
    if (tab === "reregion") {
      if (!targetFiles.length) { setMessage("Add a target-region reference save first."); return; }
      if (!originalFiles.length) { setMessage("Add your original save to continue."); return; }
      setMessageType("info");
      setMessage("Both save selections are ready. Region conversion is not active until a compatible save-processing engine is connected."); return;
    }
    if (!files.length) { setMessage("Choose the required save file(s) first."); return; }
    setMessageType("info");
    setMessage("Your file selection is ready. Processing is not active until a compatible save-processing engine is connected.");
  };

  const renderFiles = (list: File[], setter: (next: File[]) => void) => list.length > 0 && (
    <div className="selected-files">
      {list.map((file, index) => (
        <div className="selected-file" key={`${file.name}-${file.size}`}>
          <span className="selected-file-icon"><FileIcon size={17} /></span>
          <span className="selected-file-copy"><b>{file.name}</b><small>{formatSize(file.size)}</small></span>
          <button type="button" className="icon-button" aria-label={`Remove ${file.name}`} onClick={() => setter(list.filter((_, i) => i !== index))}><X size={15} /></button>
        </div>
      ))}
    </div>
  );

  const dropZone = (id: string, ref: React.RefObject<HTMLInputElement>, list: File[], setter: (next: File[]) => void, accept: (incoming: FileList | null) => void, title: string, help: string) => (
    <div className="upload-block">
      <div
        className={`drop-zone ${dragTarget === id ? "dragging" : ""} ${list.length ? "has-files" : ""}`}
        onDragOver={(e) => { e.preventDefault(); setDragTarget(id); }}
        onDragLeave={() => setDragTarget(null)}
        onDrop={(e) => { e.preventDefault(); setDragTarget(null); accept(e.dataTransfer.files); }}
        onClick={() => ref.current?.click()}
        role="button" tabIndex={0} aria-label={title}
        onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); ref.current?.click(); } }}
      >
        <span className="upload-icon"><UploadCloud size={23} /></span>
        <strong>{title}</strong>
        <small>{help}</small>
        <button type="button" className="browse-button" onClick={(e) => { e.stopPropagation(); ref.current?.click(); }}>Browse files <ArrowUpRight size={14} /></button>
        <input ref={ref} hidden type="file" multiple onChange={(e) => { accept(e.target.files); e.currentTarget.value = ""; }} />
      </div>
      {renderFiles(list, setter)}
    </div>
  );

  return (
    <main className="workspace-shell">
      <div className="ambient ambient-one" aria-hidden="true" />
      <div className="ambient ambient-two" aria-hidden="true" />
      <header className="topbar workspace-topbar">
        <Link className="brand-lockup" href="/"><span className="brand-mark">Q<span>×</span></span><span className="brand-words"><strong>QoiaX</strong><small>WIZARD</small></span></Link>
        <div className="workspace-top-label"><span className="live-dot" /> SAVE WORKSPACE</div>
        <Link className="back-home" href="/"><ArrowLeft size={15} /> Back to home</Link>
      </header>

      <div className="workspace-layout">
        <aside className="sidebar glass-panel">
          <div className="sidebar-intro"><span className="section-kicker">WORKSPACE</span><h2>Save tools</h2><p>Select a tool to open its workflow.</p></div>
          <div className="sidebar-nav" role="tablist" aria-label="Save tools">
            {tabs.map((item) => (
              <button key={item.id} role="tab" aria-selected={tab === item.id} className={`sidebar-tab ${tab === item.id ? "active" : ""}`} onClick={() => { setTab(item.id); setMessage(""); }}>
                <span className="sidebar-tab-icon"><item.icon size={17} /></span><span>{item.label}</span>{tab === item.id && <ChevronRight size={15} className="tab-chevron" />}
              </button>
            ))}
          </div>
          <div className="sidebar-note"><ShieldCheck size={17} /><div><b>Privacy first</b><p>File selection happens locally in your browser.</p></div></div>
          <Link className="sidebar-help" href="/"><CircleHelp size={15} /> About QoiaX <ArrowUpRight size={13} /></Link>
        </aside>

        <section className="workspace-main">
          <div className="workspace-heading">
            <div><div className="breadcrumb"><Link href="/">Home</Link><ChevronRight size={13} /><span>Save tools</span></div><span className="section-kicker">{active.short}</span><h1>{active.title}</h1><p>{active.description}</p></div>
            <button className="reset-button" type="button" onClick={resetCurrent}><RotateCcw size={14} /> Reset</button>
          </div>

          <div className="workflow-card glass-panel">
            <div className="workflow-card-header"><div className="workflow-title-wrap"><span className={`tool-icon ${tab === "reregion" ? "indigo" : tab === "decrypt" ? "violet" : tab === "encrypt" ? "cyan" : "blue"}`}><active.icon size={20} /></span><div><h2>{tab === "reregion" ? "Region conversion setup" : tab === "resign" ? "Resign setup" : tab === "decrypt" ? "Decryption setup" : tab === "encrypt" ? "Encryption setup" : "Save Lab workspace"}</h2><p>Complete the required fields below.</p></div></div><span className="secure-tag"><ShieldCheck size={13} /> LOCAL INPUT</span></div>

            {tab === "resign" && <div className="form-section">
              <label className="field-label" htmlFor="psn-id">PlayStation Online ID <span className="required">*</span></label>
              <input id="psn-id" className="text-field" value={psid} onChange={(e) => setPsid(e.target.value)} placeholder="Ex: XiTE-Y" autoComplete="off" required aria-required="true" />
              <p className="field-hint">Enter the Online ID of the profile you want to prepare this save for.</p>
              {dropZone("general", inputRef, files, setFiles, acceptGeneral, "Drop your save files here", "or browse your device · Multiple files supported")}
            </div>}

            {tab === "reregion" && <div className="form-section region-flow">
              <div className="step-progress"><div className="step-item done"><span>01</span><div><b>Target region save</b><small>Reference file</small></div></div><div className="step-line" /><div className={`step-item ${targetFiles.length ? "done" : ""}`}><span>02</span><div><b>Original save</b><small>Your save file</small></div></div></div>
              <div className="region-explainer"><Sparkles size={16} /><p>First select a save from the region you want to change <em>to</em>. Then select your own original save that you want to convert.</p></div>
              <div className="region-upload-grid">
                <div><label className="field-label">01 / Target Region Save <span className="required">*</span></label>{dropZone("target", targetInputRef, targetFiles, setTargetFiles, acceptTarget, "Add target-region save", "A save from the destination region")}</div>
                <div><label className="field-label">02 / Original Save <span className="required">*</span></label>{dropZone("original", originalInputRef, originalFiles, setOriginalFiles, acceptOriginal, "Add your original save", "The save whose region you want to change")}</div>
              </div>
            </div>}

            {tab !== "resign" && tab !== "reregion" && <div className="form-section">
              <div className="notice notice-neutral"><CircleHelp size={17} /><p>{tab === "decrypt" ? "Select the encrypted save files required by the decryption workflow. If your save uses paired files, include the complete pair." : tab === "encrypt" ? "Select the supported save data required by the encryption workflow." : "Select files you want to inspect or prepare. Available actions depend on the tools connected to this build."}</p></div>
              {dropZone("general", inputRef, files, setFiles, acceptGeneral, "Drop your save files here", "or browse your device · Multiple files supported")}
            </div>}

            {message && <div className={`status-message ${messageType}`} role="status"><span className="status-message-icon">{messageType === "error" ? <CircleHelp size={17} /> : <Check size={17} />}</span><p>{message}</p></div>}

            <div className="engine-notice"><span className="engine-icon"><ShieldCheck size={17} /></span><div><b>Processing engine status <span className="engine-badge">NOT CONNECTED</span></b><p>This build currently supports file selection and input checks only. A compatible PS4 save-processing engine is still required to resign, encrypt, decrypt, or convert save regions.</p></div></div>
            <div className="workflow-footer"><div className="file-summary"><span className="summary-dot" />{tab === "reregion" ? `${targetFiles.length} target · ${originalFiles.length} original` : `${files.length} file(s) selected`}</div><button className="primary-button check-button" type="button" onClick={runCheck}><Check size={16} /> Check selection</button></div>
          </div>
          <footer className="workspace-footer"><span>QoiaX Wizard</span><span>PS5-inspired interface</span><span>Processing engine not connected</span></footer>
        </section>
      </div>
    </main>
  );
}
