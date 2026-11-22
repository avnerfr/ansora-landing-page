"use client";
import { useRef, useState } from "react";
import { asset, BASE } from "@/lib/base";
import type { Artwork, Profile, SiteContent } from "@/lib/content";
import { COPY_FIELDS, defaultCopy } from "@/lib/copy";

// Group the text fields in page order, keeping each field's definition order.
const COPY_GROUPS = COPY_FIELDS.reduce<{ name: string; fields: typeof COPY_FIELDS }[]>((acc, f) => {
  const g = acc.find((x) => x.name === f.group);
  if (g) g.fields.push(f);
  else acc.push({ name: f.group, fields: [f] });
  return acc;
}, []);

const MAX_SIDE = 2000;

/** Downscale in the browser so uploads stay well under the 4.5MB request limit. */
async function prepare(file: File): Promise<{ blob: Blob; w: number; h: number }> {
  const bmp = await createImageBitmap(file);
  const k = Math.min(1, MAX_SIDE / Math.max(bmp.width, bmp.height));
  const w = Math.round(bmp.width * k);
  const h = Math.round(bmp.height * k);
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  canvas.getContext("2d")!.drawImage(bmp, 0, 0, w, h);
  const blob = await new Promise<Blob>((res, rej) => canvas.toBlob((b) => (b ? res(b) : rej(new Error("encode"))), "image/jpeg", 0.88));
  return { blob, w, h };
}

async function upload(file: File): Promise<Pick<Artwork, "id" | "src" | "w" | "h">> {
  const { blob, w, h } = await prepare(file);
  const form = new FormData();
  form.set("file", new File([blob], "art.jpg", { type: "image/jpeg" }));
  const res = await fetch(`${BASE}/api/manage/upload/`, { method: "POST", body: form });
  if (!res.ok) throw new Error(((await res.json().catch(() => null)) as { error?: string } | null)?.error || `upload ${res.status}`);
  const { id, src } = await res.json();
  return { id, src, w, h };
}

const FIELDS: { key: keyof Profile; label: string; hint?: string; ltr?: boolean }[] = [
  { key: "name", label: "שם" },
  { key: "tagline", label: "כותרת משנה (מתחת ללוגו)" },
  { key: "heroLine", label: "משפט פתיחה (כותרת ראשית)" },
  { key: "heroSub", label: "משפט תומך מתחת לכותרת" },
  { key: "whatsapp", label: "וואטסאפ (עם קידומת מדינה)", hint: "972501234567", ltr: true },
  { key: "phone", label: "טלפון", ltr: true },
  { key: "instagram", label: "אינסטגרם (שם משתמש)", ltr: true },
  { key: "facebook", label: "פייסבוק (קישור לפרופיל)", hint: "https://www.facebook.com/…", ltr: true },
  { key: "email", label: "אימייל", ltr: true },
];

export function ManageClient({ initial }: { initial: SiteContent }) {
  const [profile, setProfile] = useState(initial.profile);
  const [gallery, setGallery] = useState(initial.gallery);
  const [copy, setCopy] = useState(initial.copy);
  const [busy, setBusy] = useState(false);
  const [dirty, setDirty] = useState(false);
  const [status, setStatus] = useState<{ kind: "" | "ok" | "err"; text: string }>({ kind: "", text: "" });
  const replaceId = useRef<string | null>(null);
  const addInput = useRef<HTMLInputElement>(null);
  const replaceInput = useRef<HTMLInputElement>(null);
  const photoInput = useRef<HTMLInputElement>(null);
  const photoKey = useRef<"photo" | "originPhoto">("photo");
  const pickPhoto = (key: "photo" | "originPhoto") => {
    photoKey.current = key;
    photoInput.current?.click();
  };

  const touch = () => {
    setDirty(true);
    setStatus({ kind: "", text: "יש שינויים שלא נשמרו" });
  };
  const patch = (id: string, p: Partial<Artwork>) => {
    setGallery((g) => g.map((a) => (a.id === id ? { ...a, ...p } : a)));
    touch();
  };
  const move = (i: number, d: number) => {
    setGallery((g) => {
      const j = i + d;
      if (j < 0 || j >= g.length) return g;
      const next = [...g];
      [next[i], next[j]] = [next[j], next[i]];
      return next;
    });
    touch();
  };

  async function addFiles(files: FileList | null) {
    if (!files?.length) return;
    setBusy(true);
    try {
      const added: Artwork[] = [];
      for (const [n, f] of [...files].entries()) {
        setStatus({ kind: "", text: `מעלה תמונה ${n + 1} מתוך ${files.length}…` });
        added.push({ ...(await upload(f)), title: f.name.replace(/\.[^.]+$/, ""), description: "" });
      }
      setGallery((g) => [...g, ...added]);
      touch();
    } catch (e) {
      setStatus({ kind: "err", text: `ההעלאה נכשלה: ${e instanceof Error ? e.message : "שגיאה"}` });
    } finally {
      setBusy(false);
      if (addInput.current) addInput.current.value = "";
    }
  }

  async function replaceFile(files: FileList | null) {
    const id = replaceId.current;
    if (!files?.[0] || !id) return;
    setBusy(true);
    setStatus({ kind: "", text: "מחליף תמונה…" });
    try {
      const { src, w, h } = await upload(files[0]);
      patch(id, { src, w, h });
    } catch (e) {
      setStatus({ kind: "err", text: `ההעלאה נכשלה: ${e instanceof Error ? e.message : "שגיאה"}` });
    } finally {
      setBusy(false);
      if (replaceInput.current) replaceInput.current.value = "";
    }
  }

  async function replacePhoto(files: FileList | null) {
    if (!files?.[0]) return;
    const key = photoKey.current;
    setBusy(true);
    setStatus({ kind: "", text: "מעלה תמונה…" });
    try {
      const { src } = await upload(files[0]);
      setProfile((p) => ({ ...p, [key]: src }));
      touch();
    } catch (e) {
      setStatus({ kind: "err", text: `ההעלאה נכשלה: ${e instanceof Error ? e.message : "שגיאה"}` });
    } finally {
      setBusy(false);
      if (photoInput.current) photoInput.current.value = "";
    }
  }

  async function save() {
    setBusy(true);
    setStatus({ kind: "", text: "שומר…" });
    try {
      const res = await fetch(`${BASE}/api/manage/content/`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ profile, gallery, copy }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setDirty(false);
      setStatus({ kind: "ok", text: "נשמר ✓ האתר עודכן" });
    } catch (e) {
      setStatus({ kind: "err", text: `השמירה נכשלה: ${e instanceof Error ? e.message : "שגיאה"}` });
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="mg">
      <div className="mg-top">
        <div>
          <h1>ניהול האתר</h1>
          <span className="muted">עריכת הפרופיל והגלריה</span>
        </div>
        <a className="btn" href={asset("/")} target="_blank" rel="noopener noreferrer">צפייה באתר ↗</a>
      </div>

      <section className="mg-card glass">
        <h2>פרופיל</h2>
        <div className="mg-grid">
          {FIELDS.map((f) => (
            <label key={f.key}>
              {f.label}
              <input
                value={profile[f.key]}
                placeholder={f.hint}
                dir={f.ltr ? "ltr" : undefined}
                onChange={(e) => (setProfile({ ...profile, [f.key]: e.target.value }), touch())}
              />
            </label>
          ))}
          <div className="wide mg-photo">
            {profile.photo ? <img src={asset(profile.photo)} alt="תמונת פרופיל" /> : <div className="mg-photo-empty">אין תמונה</div>}
            <div className="mg-row">
              <button className="btn sm" disabled={busy} onClick={() => pickPhoto("photo")}>החלפת תמונת פרופיל (ליד שלב 1)</button>
              {profile.photo && <button className="btn sm danger" onClick={() => (setProfile({ ...profile, photo: "" }), touch())}>הסרה</button>}
            </div>
          </div>
          <div className="wide mg-photo">
            {profile.originPhoto ? <img src={asset(profile.originPhoto)} alt="תמונה לקטע איך הכל התחיל" /> : <div className="mg-photo-empty">אין תמונה</div>}
            <div className="mg-row">
              <button className="btn sm" disabled={busy} onClick={() => pickPhoto("originPhoto")}>תמונה לקטע ״איך הכל התחיל״</button>
              {profile.originPhoto && <button className="btn sm danger" onClick={() => (setProfile({ ...profile, originPhoto: "" }), touch())}>הסרה</button>}
            </div>
          </div>
          <input ref={photoInput} type="file" accept="image/jpeg,image/png,image/webp" onChange={(e) => replacePhoto(e.target.files)} />
        </div>
      </section>

      <section className="mg-card glass">
        <h2>טקסטים באתר</h2>
        <p className="muted" style={{ marginTop: -8 }}>
          כל הטקסטים בדף, לפי סדר הופעתם. שדה ריק מסתיר את האלמנט באתר. ״איפוס״ מחזיר את הנוסח המקורי.
        </p>
        {COPY_GROUPS.map((g) => (
          <details key={g.name} className="mg-group">
            <summary>{g.name}</summary>
            <div className="mg-grid">
              {g.fields.map((f) => (
                <label key={f.key} className="wide">
                  <span className="mg-label">
                    {f.label}
                    {copy[f.key] !== defaultCopy[f.key] && (
                      <button type="button" className="mg-reset" onClick={() => (setCopy({ ...copy, [f.key]: defaultCopy[f.key] }), touch())}>
                        איפוס
                      </button>
                    )}
                  </span>
                  {f.rows ? (
                    <textarea style={{ minHeight: f.rows * 26 + 16 }} value={copy[f.key]} onChange={(e) => (setCopy({ ...copy, [f.key]: e.target.value }), touch())} />
                  ) : (
                    <input value={copy[f.key]} onChange={(e) => (setCopy({ ...copy, [f.key]: e.target.value }), touch())} />
                  )}
                </label>
              ))}
            </div>
          </details>
        ))}
      </section>

      <section className="mg-card glass">
        <div className="mg-top" style={{ marginBottom: 16 }}>
          <h2 style={{ margin: 0 }}>גלריה ({gallery.length})</h2>
          <button className="btn primary" disabled={busy} onClick={() => addInput.current?.click()}>＋ הוספת ציורים</button>
        </div>
        <input ref={addInput} type="file" accept="image/jpeg,image/png,image/webp" multiple onChange={(e) => addFiles(e.target.files)} />
        <input ref={replaceInput} type="file" accept="image/jpeg,image/png,image/webp" onChange={(e) => replaceFile(e.target.files)} />

        {gallery.length === 0 && <p className="muted">אין עדיין ציורים. לחצי על ״הוספת ציורים״.</p>}
        <div className="mg-pieces">
          {gallery.map((a, i) => (
            <div className="mg-piece" key={a.id}>
              <div className="mg-thumb"><img src={asset(a.src)} alt={a.title} /></div>
              <input value={a.title} placeholder="כותרת (למשל: רכיבה על סוס)" onChange={(e) => patch(a.id, { title: e.target.value })} />
              <textarea
                className="mg-desc"
                value={a.description}
                placeholder="תיאור / הרקע לציור (למשל: סוס מייצג שליטה…) — אפשר טקסט ארוך"
                onChange={(e) => patch(a.id, { description: e.target.value })}
              />
              <div className="mg-row">
                <button className="btn sm" disabled={i === 0} onClick={() => move(i, -1)} title="הזז קדימה">→</button>
                <button className="btn sm" disabled={i === gallery.length - 1} onClick={() => move(i, 1)} title="הזז אחורה">←</button>
                <button className="btn sm" disabled={busy} onClick={() => ((replaceId.current = a.id), replaceInput.current?.click())}>החלפה</button>
                <button
                  className="btn sm danger"
                  onClick={() => {
                    if (confirm("למחוק את הציור מהגלריה?")) (setGallery((g) => g.filter((x) => x.id !== a.id)), touch());
                  }}
                >
                  מחיקה
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="mg-bar">
        <span className={`mg-status ${status.kind}`} role="status">{status.text}</span>
        <button className="btn primary" disabled={busy || !dirty} onClick={save}>שמירה</button>
      </div>
    </div>
  );
}
