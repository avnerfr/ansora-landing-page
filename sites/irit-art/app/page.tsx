import { asset } from "@/lib/base";
import { getContent } from "@/lib/store";
import { Dreamscape } from "./_components/Dreamscape";
import { Gallery } from "./_components/Gallery";

// Content is edited at runtime from /manage, so render per request.
export const dynamic = "force-dynamic";

const painPoints = [
  "שנים של ציפייה ארוכה לפרי בטן.",
  "דאגה עמוקה לבן זוג שלא בקו הבריאות.",
  "תחושה שהשפע הכלכלי תמיד בורח ברגע האחרון.",
  "או בדידות שקטה ששום עצה טובה לא מצליחה לרפא.",
];

const steps = [
  {
    n: "1",
    title: "שיחה אישית מהלב",
    body: [
      ["מה קורה בה: ", "לפני שאני ממליצה על ציור, אני שואלת אותך מה הכאב שלך, מה חסר לך בחיים, ומה את רוצה לזמן לעצמך. מתוך ההיכרות הזו בינינו, אני בוחרת יחד איתך את הציור שמתאים בול לצורך שלך."],
    ],
    feel: "לראשונה הרגשתי שמישהי באמת שמעה אותי לפני שהמליצה לי על משהו.",
  },
  {
    n: "2",
    title: "הגיון שעושה סדר בפנים",
    body: [
      ["הבסיס: ", "פיתחתי שיטה שמחברת בין פשר חלומות יהודי לבין פסיכולוגיה של התת-מודע. העולם שלנו מגיב לסמלים ויזואליים. הציור נבחר מתוך הגיון עמוק שאת יכולה להרגיש ולהסביר לעצמך – לא סתם כי הוא יפה בסלון."],
    ],
    feel: "עכשיו אני מבינה למה הציור הזה ולא אחר – יש לזה משמעות שאני מרגישה בגוף.",
  },
  {
    n: "3",
    title: "לעשות צעד ממשי",
    body: [
      ["התוצאה: ", "הציור הזה הוא לא דקורציה. הוא כלי שעוזר לך לעורר תהליך פנימי, ולכוון אנרגיה אל מה שאת באמת רוצה להגשים – זוגיות, בריאות, שפע או ילדים."],
    ],
    feel: "סוף סוף עשיתי משהו אמיתי בשבילי, ולא רק חיכיתי שהמצב ישתנה לבד.",
  },
];

export default async function Page() {
  const { profile, gallery } = await getContent();
  // WhatsApp number: the saved one, else derived from the phone (Israeli 05x-xxxxxxx → 9725xxxxxxxx).
  const phoneDigits = profile.phone.replace(/\D/g, "");
  const waNumber = profile.whatsapp || (/^0[2-9]\d{7,8}$/.test(phoneDigits) ? `972${phoneDigits.slice(1)}` : "");
  const wa = waNumber ? `https://wa.me/${waNumber}` : "";
  const talk = wa || (profile.phone ? `tel:${profile.phone}` : "#contact");
  const waProps = wa ? { target: "_blank", rel: "noopener noreferrer" } : {};

  return (
    <>
      <Dreamscape />

      <header className="nav">
        <a href="#top" className="nav-name">{profile.name}</a>
        <nav>
          <a href="#gallery">גלריה</a>
          <a href="#method">הדרך שלי</a>
          <a href="#contact">יצירת קשר</a>
        </nav>
      </header>

      <main id="top">
        {/* 1. Hero */}
        <section className="hero">
          <div className="hero-logo">
            <img src={asset("/logo.png")} alt={`${profile.name} — ${profile.tagline}`} width={1536} height={1024} />
          </div>
          {profile.heroLine && <h1 className="hero-line">{profile.heroLine}</h1>}
          {profile.heroSub && <p className="hero-sub">{profile.heroSub}</p>}
          <div className="cta-row">
            <a className="hero-cta" href={talk} {...waProps}>דברי איתי בוואטסאפ</a>
            <a className="hero-cta ghost" href="#gallery">לצפייה בציורים</a>
          </div>
          <a className="scroll-cue" href="#gallery" aria-label="גלול למטה"><span /></a>
        </section>

        {/* 2. Gallery */}
        <section id="gallery" className="section">
          <h2 className="section-title">הגלריה</h2>
          <p className="section-sub">ציורים שנבחרים מתוך שיחה, לא מקטלוג</p>
          <Gallery items={gallery} />
        </section>

        {/* 3. The pain */}
        <section className="section prose-sec">
          <div className="prose glass reveal-on-scroll">
            <h2 className="section-title">לחיות עם כאב שקשה להסביר לאחרים</h2>
            <p>יש תקופות בחיים שבהן מציאות מסוימת יושבת לך על הלב, וקשה למצוא מישהו שיבין באמת:</p>
            <ul className="pain-list">
              {painPoints.map((t) => <li key={t}>{t}</li>)}
            </ul>
            <p>
              את רוצה לעשות משהו, לא רק לשבת ולחכות שדברים יקרו מעצמם. אבל טבעי לגמרי שיעלה בך החשש: ״אני אוציא כסף על עוד דבר שלא יעשה כלום, ושיישאר סתם תמונה יפה על הקיר?״
            </p>
            <p>
              כבר ניסית דברים בעבר - תפילות, עצות, אולי ייעוץ כזה או אחר. חלקם הרגישו לך רחוקים, מנוכרים, לא מחוברים אלייך. מה שאת באמת מחפשת הוא לא ציור. את מחפשת כיוון אמיתי. מישהי שתשאל אותך שאלות מהלב, תבין את מה שעובר עלייך, ותעשה איתך משהו מכוון.
            </p>
          </div>
        </section>

        {/* 4. The method, with Irit's photo beside step 1 */}
        <section id="method" className="section">
          <h2 className="section-title">הדרך שלי איתך: שלושה שלבים פשוטים</h2>
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
                  <h3>{s.title}</h3>
                  {s.body.map(([lead, text]) => (
                    <p key={lead}><strong>{lead}</strong>{text}</p>
                  ))}
                  <p className="step-feel"><span>איך זה מרגיש: </span>״{s.feel}״</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* 5. Why it's different */}
        <section className="section prose-sec">
          <div className="prose glass reveal-on-scroll">
            <h2 className="section-title">למה זה שונה מכל מה שראית ברשת?</h2>
            <p>יש היום המון אתרים שמוכרים אמנות:</p>
            <ul className="pain-list">
              <li>יש מי שמוכר הדפסות לפי חדרים בבית (סלון, מטבח) כמו בחנות עיצוב.</li>
              <li>ויש מי שמציע מחשבונים אוטומטיים וחישובים ממוחשבים בלי לשאול אותך אף שאלה אישית.</li>
            </ul>
            <p>שניהם משאירים פתוחה את השאלה שהכי כואבת לך: למה דווקא הציור הזה, בשבילי, עכשיו?</p>
            <p><strong>אני פועלת אחרת לגמרי:</strong></p>
            <ul className="pain-list">
              <li><strong>מתחילים בשיחה:</strong> אין כאן מכירה אוטומטית מקטלוג, אלא הקשבה אמיתית למה שאת עוברת.</li>
              <li><strong>יש מאחורי זה שיטה:</strong> חיבור בין עולם הסמלים המסורתי לתת-מודע, כך שהבחירה מרגישה מדויקת ושורשית.</li>
            </ul>
          </div>
        </section>

        {/* 6. Contact */}
        <section id="contact" className="section contact">
          <h2 className="section-title">בואי נדבר. בלי לחץ, רק כדי להרגיש מה נכון עבורך.</h2>
          <p className="section-sub">דברי איתי לשיחת כוונה אישית, ונראה יחד מה הצעד הבא שנכון לזמן לחיים שלך.</p>
          <div className="cta-row">
            <a className="hero-cta" href={talk} {...waProps}>לשיחה אישית בוואטסאפ עם אירית</a>
          </div>
          <div className="contact-links">
            {profile.phone && <a className="pill" href={`tel:${profile.phone}`} dir="ltr">{profile.phone}</a>}
            {profile.instagram && <a className="pill" href={`https://instagram.com/${profile.instagram}`} target="_blank" rel="noopener noreferrer">אינסטגרם</a>}
            {profile.facebook && <a className="pill" href={profile.facebook} target="_blank" rel="noopener noreferrer">פייסבוק</a>}
            {profile.email && <a className="pill" href={`mailto:${profile.email}`}>אימייל</a>}
          </div>
          <p className="disclaimer">הציור אינו תחליף לטיפול רפואי.</p>
        </section>
      </main>

      <footer className="footer">
        © {new Date().getFullYear()} {profile.name} · נבנה ע״י <a href="https://ansora.io" target="_blank" rel="noopener noreferrer">Ansora</a>
      </footer>
    </>
  );
}
