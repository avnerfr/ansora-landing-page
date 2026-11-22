/**
 * Every editable text on the page (besides the profile fields and the gallery).
 * Defaults live here; /manage edits them and the saved values override them.
 * Fields marked `lines` hold one list item per line.
 */
export type CopyField = {
  key: string;
  label: string;
  group: string;
  rows?: number; // textarea height; omitted = single-line input
  hint?: string;
  def: string;
};

const stepFields = (n: 1 | 2 | 3, title: string, lead: string, body: string, feel: string): CopyField[] => [
  { key: `step${n}Title`, group: `שלב ${n}`, label: "כותרת", def: title },
  { key: `step${n}Lead`, group: `שלב ${n}`, label: "מילת פתיחה מודגשת", def: lead },
  { key: `step${n}Body`, group: `שלב ${n}`, label: "טקסט", rows: 4, def: body },
  { key: `step${n}Feel`, group: `שלב ${n}`, label: "איך זה מרגיש (הציטוט, בלי מרכאות)", rows: 2, def: feel },
];

export const COPY_FIELDS: CopyField[] = [
  { key: "navGallery", group: "תפריט עליון", label: "קישור לגלריה", def: "גלריה" },
  { key: "navMethod", group: "תפריט עליון", label: "קישור לדרך שלי", def: "הדרך שלי" },
  { key: "navContact", group: "תפריט עליון", label: "קישור ליצירת קשר", def: "יצירת קשר" },

  { key: "ctaPrimary", group: "פתיחה", label: "טקסט הכפתור הראשי (וואטסאפ)", def: "דברי איתי בוואטסאפ" },
  { key: "ctaGhost", group: "פתיחה", label: "טקסט הכפתור המשני", def: "לצפייה בציורים" },

  { key: "galleryTitle", group: "גלריה", label: "כותרת", def: "הגלריה" },
  { key: "gallerySub", group: "גלריה", label: "כותרת משנה", def: "ציורים שנבחרים מתוך שיחה, לא מקטלוג" },

  { key: "painTitle", group: "כאב שקשה להסביר", label: "כותרת", def: "לחיות עם כאב שקשה להסביר לאחרים" },
  { key: "painIntro", group: "כאב שקשה להסביר", label: "פתיחה", rows: 2, def: "יש תקופות בחיים שבהן מציאות מסוימת יושבת לך על הלב, וקשה למצוא מישהו שיבין באמת:" },
  {
    key: "painList",
    group: "כאב שקשה להסביר",
    label: "רשימה (שורה = פריט)",
    rows: 5,
    def: "שנים של ציפייה ארוכה לפרי בטן.\nדאגה עמוקה לבן זוג שלא בקו הבריאות.\nתחושה שהשפע הכלכלי תמיד בורח ברגע האחרון.\nאו בדידות שקטה ששום עצה טובה לא מצליחה לרפא.",
  },
  {
    key: "painP1",
    group: "כאב שקשה להסביר",
    label: "פסקה ראשונה",
    rows: 4,
    def: "את רוצה לעשות משהו, לא רק לשבת ולחכות שדברים יקרו מעצמם. אבל טבעי לגמרי שיעלה בך החשש: ״אני אוציא כסף על עוד דבר שלא יעשה כלום, ושיישאר סתם תמונה יפה על הקיר?״",
  },
  {
    key: "painP2",
    group: "כאב שקשה להסביר",
    label: "פסקה שנייה",
    rows: 5,
    def: "כבר ניסית דברים בעבר - תפילות, עצות, אולי ייעוץ כזה או אחר. חלקם הרגישו לך רחוקים, מנוכרים, לא מחוברים אלייך. מה שאת באמת מחפשת הוא לא ציור. את מחפשת כיוון אמיתי. מישהי שתשאל אותך שאלות מהלב, תבין את מה שעובר עלייך, ותעשה איתך משהו מכוון.",
  },

  { key: "methodTitle", group: "הדרך שלי (שלושה שלבים)", label: "כותרת", def: "הדרך שלי איתך: שלושה שלבים פשוטים" },
  { key: "feelLabel", group: "הדרך שלי (שלושה שלבים)", label: "תווית ״איך זה מרגיש״", def: "איך זה מרגיש:" },
  ...stepFields(
    1,
    "שיחה אישית מהלב",
    "מה קורה בה:",
    "לפני שאני ממליצה על ציור, אני שואלת אותך מה הכאב שלך, מה חסר לך בחיים, ומה את רוצה לזמן לעצמך. מתוך ההיכרות הזו בינינו, אני בוחרת יחד איתך את הציור שמתאים בול לצורך שלך.",
    "לראשונה הרגשתי שמישהי באמת שמעה אותי לפני שהמליצה לי על משהו.",
  ),
  ...stepFields(
    2,
    "הגיון שעושה סדר בפנים",
    "הבסיס:",
    "פיתחתי שיטה שמחברת בין פשר חלומות יהודי לבין פסיכולוגיה של התת-מודע. העולם שלנו מגיב לסמלים ויזואליים. הציור נבחר מתוך הגיון עמוק שאת יכולה להרגיש ולהסביר לעצמך – לא סתם כי הוא יפה בסלון.",
    "עכשיו אני מבינה למה הציור הזה ולא אחר – יש לזה משמעות שאני מרגישה בגוף.",
  ),
  ...stepFields(
    3,
    "לעשות צעד ממשי",
    "התוצאה:",
    "הציור הזה הוא לא דקורציה. הוא כלי שעוזר לך לעורר תהליך פנימי, ולכוון אנרגיה אל מה שאת באמת רוצה להגשים – זוגיות, בריאות, שפע או ילדים.",
    "סוף סוף עשיתי משהו אמיתי בשבילי, ולא רק חיכיתי שהמצב ישתנה לבד.",
  ),

  { key: "originTitle", group: "איך הכל התחיל", label: "כותרת", def: "איך הכל התחיל" },
  {
    key: "originBody",
    group: "איך הכל התחיל",
    label: "הסיפור (פסקה חדשה = שורה ריקה). אם גם הטקסט וגם התמונה ריקים, הקטע לא יוצג באתר",
    rows: 9,
    // Starter draft from the client's own value-proposition notes — Irit should rewrite it in her own words.
    def: "הכל התחיל מסיפור אחד. לקוחה שבעלה לא היה בקו הבריאות קנתה ציור של סוס דוהר, ואחרי שהציור נכנס לבית, בעלה הרגיש הרבה יותר טוב.\n\nמאז אני יודעת שציור שנבחר נכון הוא הרבה יותר מקישוט, ולכן אני מתחילה תמיד בשיחה.",
  },

  { key: "diffTitle", group: "למה זה שונה", label: "כותרת", def: "למה זה שונה מכל מה שראית ברשת?" },
  { key: "diffIntro", group: "למה זה שונה", label: "פתיחה", def: "יש היום המון אתרים שמוכרים אמנות:" },
  {
    key: "diffOthers",
    group: "למה זה שונה",
    label: "מה אחרים עושים (שורה = פריט)",
    rows: 3,
    def: "יש מי שמוכר הדפסות לפי חדרים בבית (סלון, מטבח) כמו בחנות עיצוב.\nויש מי שמציע מחשבונים אוטומטיים וחישובים ממוחשבים בלי לשאול אותך אף שאלה אישית.",
  },
  { key: "diffQuestion", group: "למה זה שונה", label: "השאלה הפתוחה", rows: 2, def: "שניהם משאירים פתוחה את השאלה שהכי כואבת לך: למה דווקא הציור הזה, בשבילי, עכשיו?" },
  { key: "diffLead", group: "למה זה שונה", label: "משפט מעבר (מודגש)", def: "אני פועלת אחרת לגמרי:" },
  {
    key: "diffMine",
    group: "למה זה שונה",
    label: "מה אני עושה (שורה = פריט; המילים לפני הנקודתיים הראשונות יודגשו)",
    rows: 4,
    def: "מתחילים בשיחה: אין כאן מכירה אוטומטית מקטלוג, אלא הקשבה אמיתית למה שאת עוברת.\nיש מאחורי זה שיטה: חיבור בין עולם הסמלים המסורתי לתת-מודע, כך שהבחירה מרגישה מדויקת ושורשית.",
  },

  { key: "contactTitle", group: "יצירת קשר", label: "כותרת", def: "בואי נדבר. בלי לחץ, רק כדי להרגיש מה נכון עבורך." },
  { key: "contactSub", group: "יצירת קשר", label: "כותרת משנה", rows: 2, def: "דברי איתי לשיחת כוונה אישית, ונראה יחד מה הצעד הבא שנכון לזמן לחיים שלך." },
  { key: "contactButton", group: "יצירת קשר", label: "טקסט הכפתור", def: "לשיחה אישית בוואטסאפ עם אירית" },
  { key: "disclaimer", group: "יצירת קשר", label: "הערה קטנה בתחתית (אפשר להשאיר ריק)", def: "הציור אינו תחליף לטיפול רפואי." },
];

export type Copy = Record<string, string>;

export const defaultCopy: Copy = Object.fromEntries(COPY_FIELDS.map((f) => [f.key, f.def]));

/** Missing keys fall back to the default; a saved empty string stays empty (hides the element). */
export function sanitizeCopy(raw: unknown): Copy {
  const r = (raw && typeof raw === "object" ? raw : {}) as Record<string, unknown>;
  return Object.fromEntries(
    COPY_FIELDS.map((f) => [f.key, typeof r[f.key] === "string" ? (r[f.key] as string).slice(0, 2000) : f.def]),
  );
}

/** One item per non-empty line. */
export const lines = (s: string) => s.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
