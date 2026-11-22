import { asset } from "@/lib/base";
import { lines } from "@/lib/copy";
import { getContent } from "@/lib/store";
import { Dreamscape } from "./_components/Dreamscape";
import { Gallery } from "./_components/Gallery";
import { HeroCarousel } from "./_components/HeroCarousel";

// Content is edited at runtime from /manage, so render per request.
export const dynamic = "force-dynamic";

/** "Title: rest" → bold title + rest (split on the first colon). */
function Item({ text }: { text: string }) {
  const i = text.indexOf(":");
  return i > 0 && i < 40 ? (
    <li><strong>{text.slice(0, i + 1)}</strong>{text.slice(i + 1)}</li>
  ) : (
    <li>{text}</li>
  );
}

export default async function Page() {
  const { profile, gallery, copy: c } = await getContent();

  // WhatsApp number: the saved one, else derived from the phone (Israeli 05x-xxxxxxx → 9725xxxxxxxx).
  const phoneDigits = profile.phone.replace(/\D/g, "");
  const waNumber = profile.whatsapp || (/^0[2-9]\d{7,8}$/.test(phoneDigits) ? `972${phoneDigits.slice(1)}` : "");
  const wa = waNumber ? `https://wa.me/${waNumber}` : "";
  const talk = wa || (profile.phone ? `tel:${profile.phone}` : "#contact");
  const waProps = wa ? { target: "_blank", rel: "noopener noreferrer" } : {};

  const originParagraphs = c.originBody.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);
  const showOrigin = originParagraphs.length > 0 || !!profile.originPhoto;

  const steps = [1, 2, 3].map((n) => ({
    n,
    title: c[`step${n}Title`],
    lead: c[`step${n}Lead`],
    body: c[`step${n}Body`],
    feel: c[`step${n}Feel`],
  }));

  return (
    <>
      <Dreamscape />

      <header className="nav">
        <a href="#top" className="nav-name">{profile.name}</a>
        <nav>
          <a href="#method">{c.navMethod}</a>
          {showOrigin && c.navOrigin && <a href="#origin">{c.navOrigin}</a>}
          <a href="#gallery">{c.navGallery}</a>
          <a href="#contact">{c.navContact}</a>
        </nav>
      </header>

      <main id="top">
        {/* 1. Hero */}
        <section className={`hero${gallery.length ? "" : " solo"}`}>
          <div className="hero-text">
            <div className="hero-logo">
              <img src={asset("/logo.png")} alt={`${profile.name} — ${profile.tagline}`} width={1536} height={1024} />
            </div>
            {profile.heroLine && <h1 className="hero-line">{profile.heroLine}</h1>}
            {profile.heroSub && <p className="hero-sub">{profile.heroSub}</p>}
            <div className="cta-row">
              {c.ctaPrimary && <a className="hero-cta" href={talk} {...waProps}>{c.ctaPrimary}</a>}
              {c.ctaGhost && <a className="hero-cta ghost" href="#gallery">{c.ctaGhost}</a>}
            </div>
          </div>
          <HeroCarousel items={gallery} />
        </section>

        {/* 3. The pain */}
        <section className="section prose-sec">
          <div className="prose glass reveal-on-scroll">
            {c.painTitle && <h2 className="section-title">{c.painTitle}</h2>}
            {c.painIntro && <p>{c.painIntro}</p>}
            {lines(c.painList).length > 0 && (
              <ul className="pain-list">{lines(c.painList).map((t) => <li key={t}>{t}</li>)}</ul>
            )}
            {c.painP1 && <p>{c.painP1}</p>}
            {c.painP2 && <p>{c.painP2}</p>}
          </div>
        </section>

        {/* 4. The method, with Irit's photo beside step 1 */}
        <section id="method" className="section">
          {c.methodTitle && <h2 className="section-title">{c.methodTitle}</h2>}
          <div className="steps">
            {steps.map((s, i) => (
              <article
                key={s.n}
                className={`step glass reveal-on-scroll${i === 0 && profile.photo ? " has-photo" : ""}`}
                style={{ transitionDelay: `${i * 120}ms` }}
              >
                <span className="step-n">{s.n}</span>
                {i === 0 && profile.photo && (
                  <div className="about-photo">
                    <img src={asset(profile.photo)} alt={profile.name} loading="lazy" />
                  </div>
                )}
                <div className="step-text">
                  {s.title && <h3>{s.title}</h3>}
                  {(s.lead || s.body) && (
                    <p>{s.lead && <strong>{s.lead} </strong>}{s.body}</p>
                  )}
                  {s.feel && <p className="step-feel"><span>{c.feelLabel} </span>״{s.feel}״</p>}
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* 4b. How it all began — shown only once there is text or an image */}
        {showOrigin && (
          <section id="origin" className="section prose-sec">
            <div className={`origin glass reveal-on-scroll${profile.originPhoto ? " has-photo" : ""}`}>
              {profile.originPhoto && (
                <div className="origin-photo">
                  <img src={asset(profile.originPhoto)} alt={c.originTitle || ""} loading="lazy" />
                </div>
              )}
              <div className="origin-text">
                {c.originTitle && <h2 className="section-title">{c.originTitle}</h2>}
                {originParagraphs.map((p, k) => <p key={k}>{p}</p>)}
              </div>
            </div>
          </section>
        )}

        {/* 5. Gallery (below the method and the origin story) */}
        <section id="gallery" className="section">
          {c.galleryTitle && <h2 className="section-title">{c.galleryTitle}</h2>}
          {c.gallerySub && <p className="section-sub">{c.gallerySub}</p>}
          <Gallery items={gallery} />
        </section>

        {/* 6. Why it's different */}
        <section className="section prose-sec">
          <div className="prose glass reveal-on-scroll">
            {c.diffTitle && <h2 className="section-title">{c.diffTitle}</h2>}
            {c.diffIntro && <p>{c.diffIntro}</p>}
            {lines(c.diffOthers).length > 0 && (
              <ul className="pain-list">{lines(c.diffOthers).map((t) => <li key={t}>{t}</li>)}</ul>
            )}
            {c.diffQuestion && <p>{c.diffQuestion}</p>}
            {c.diffLead && <p><strong>{c.diffLead}</strong></p>}
            {lines(c.diffMine).length > 0 && (
              <ul className="pain-list">{lines(c.diffMine).map((t) => <Item key={t} text={t} />)}</ul>
            )}
          </div>
        </section>

        {/* 6. Contact */}
        <section id="contact" className="section contact">
          {c.contactTitle && <h2 className="section-title">{c.contactTitle}</h2>}
          {c.contactSub && <p className="section-sub">{c.contactSub}</p>}
          {c.contactButton && (
            <div className="cta-row">
              <a className="hero-cta" href={talk} {...waProps}>{c.contactButton}</a>
            </div>
          )}
          <div className="contact-links">
            {profile.phone && <a className="pill" href={`tel:${profile.phone}`} dir="ltr">{profile.phone}</a>}
            {profile.instagram && <a className="pill" href={`https://instagram.com/${profile.instagram}`} target="_blank" rel="noopener noreferrer">אינסטגרם</a>}
            {profile.facebook && <a className="pill" href={profile.facebook} target="_blank" rel="noopener noreferrer">פייסבוק</a>}
            {profile.email && <a className="pill" href={`mailto:${profile.email}`}>אימייל</a>}
          </div>
          {c.disclaimer && <p className="disclaimer">{c.disclaimer}</p>}
        </section>
      </main>

      <footer className="footer">
        © {new Date().getFullYear()} {profile.name} · נבנה ע״י <a href="https://ansora.io" target="_blank" rel="noopener noreferrer">Ansora</a>
      </footer>
    </>
  );
}
