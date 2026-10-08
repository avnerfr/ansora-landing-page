export type Lang = "he" | "en";

export const REGISTER_URL = "https://app.ansora.io/register/sb";
export const SITE_URL = "https://ansora.io";

export type Content = {
  meta: { title: string; description: string };
  nav: { meet: string; why: string; price: string; other: string; otherHref: string; skip: string };
  ctaEnter: string;
  ctaWork: string;
  hero: { small: string; big: string; lead: string; priceLine: string; heroAlt: string };
  what: {
    eyebrow: string;
    title: string;
    cards: string[];
    stay: { title: string; items: string[]; text: string };
    brings: { title: string; items: string[]; text: string };
  };
  team: {
    eyebrow: string;
    title: string;
    imageAlt: string;
    text: string;
    priceLabel: string;
    tag: string;
    priceUnit: string;
  };
  meet: { eyebrow: string; title: string; demoAlt: string };
  why: {
    eyebrow: string;
    title: string;
    lead: string;
    wantTitle: string;
    wants: string[];
    needTitle: string;
    needs: string[];
    closing: string;
  };
  intuition: string;
  science: {
    eyebrow: string;
    title: string;
    text: string;
    items: string[];
    meaningTitle: string;
    meaningLead: string;
    meaningItems: string[];
    meaningText: string;
  };
  learns: {
    eyebrow: string;
    title: string;
    cardTitle: string;
    text: string;
    needsLead: string;
    needs: string[];
    afterTitle: string;
    afterItems: string[];
    afterText: string;
  };
  journey: {
    eyebrow: string;
    title: string;
    text: string;
    guideTitle: string;
    guideLead: string;
    guideItems: string[];
  };
  daily: {
    eyebrow: string;
    title: string;
    imageAlt: string;
    intro: string;
    stepsLead: string;
    steps: string[];
    outro: string;
  };
  /** Items for the "what else is in Ansora" accordion. The section is hidden while empty. */
  more: { title: string; body: string }[];
  moreEyebrow: string;
  moreTitle: string;
  final: { title: string; priceLine: string };
  footer: string;
};

const he: Content = {
  meta: {
    title: "אנסורה – גם לעסק קטן מגיע מוח עסקי של עסק גדול",
    description:
      "אנסורה היא צוות שעובד עבור העסק שלכם: יועצת עסקית, מנהלת שיווק, כותבת תוכן ומעצבת, מתוך אותו ידע ואותה אסטרטגיה. מחיר השקה: 247 שקלים בחודש.",
  },
  nav: {
    meet: "הכירו אותה",
    why: "למה בכלל",
    price: "מחיר",
    other: "English",
    otherHref: "/en/",
    skip: "דלגו לתוכן",
  },
  ctaEnter: "אני רוצה להיכנס לאנסורה",
  ctaWork: "אני רוצה שאנסורה תעבוד בשבילי",
  hero: {
    small: "גם לעסק קטן מגיע",
    big: "מוח עסקי של עסק גדול",
    lead: "בלי אופק עסקי ברור ובלי כניסה קבועה של לקוחות, זה לא נשאר רק בעסק. אנחנו כבעלים לא ישנים בלילה, מתקשים לחשוב קדימה, העסק לא צומח והמוטיבציה נשחקת.",
    priceLine: "מחיר ההשקה: 247 שקלים בחודש",
    heroAlt: "",
  },
  what: {
    eyebrow: "01 · מה היא עושה",
    title: "אנסורה נבנתה כדי לקחת על עצמה חלק גדול מהחשיבה ומהעבודה הזאת",
    cards: ["מכירה את העסק שלכם", "מפצחת את ערך הלקוח", "בונה את מסע הלקוח", "ומייצרת איתכם תוכן שיווקי שמביא לקוחות"],
    stay: {
      title: "אתם עדיין צריכים להיות שם",
      items: ["לכוון.", "לאשר.", "לתקן כשצריך.", "להביא את הידע המקצועי שלכם."],
      text: "אבל אתם לא צריכים להיות היועצים האסטרטגיים, מנהלי השיווק, כותבי התוכן והמעצבים של עצמכם.",
    },
    brings: {
      title: "אנסורה מביאה את הרעיונות",
      items: ["מנסחת אותם.", "מעצבת.", "ומעלה."],
      text: "אתם חוזרים להיות בעלי מקצוע בתחומכם ובעלי עסק בתחומכם. אתם צריכים לדעת להפעיל את אנסורה.",
    },
  },
  team: {
    eyebrow: "02 · הצוות",
    title: "אנסורה היא צוות שעובד עבור העסק שלכם",
    imageAlt: "יועצת עסקית, מנהלת שיווק, כותבת תוכן ומעצבת",
    text: "כולן עובדות מתוך אותו ידע על העסק, אותה אסטרטגיה, אותו מסע לקוח, אותם יעדים, ובאותו מקום. בלי לתאם בין כמה ספקים, בלי להסביר את העסק מחדש בכל פעם, בלי להתחיל כל משימה מדף ריק ובעיקר - בלי שיעשו עבורכם \"מה שכולם עושים\".",
    priceLabel: "מחיר ההשקה",
    tag: "לבעלי עסקים קטנים",
    priceUnit: "שקלים בחודש",
  },
  meet: { eyebrow: "03 · הכירו אותה", title: "בואו להכיר אותה קצת", demoAlt: "הדגמה של מסכי אנסורה" },
  why: {
    eyebrow: "04 · למה",
    title: "אז למה בכלל צריך דבר כזה?",
    lead: "כי להביא לקוחות נהיה קשה יותר. יש פחות כסף זמין בחלקים גדולים של השוק, יש הרבה עסקים שמתחרים על אותו כסף והלקוחות רוצים לא רק לבדוק ולהשוות.",
    wantTitle: "מה הלקוחות רוצים",
    wants: ["להכיר, ולהבין שזה מתאים להם בול", "לבנות אמון", "לראות עסק שנוכח באופן קבוע"],
    needTitle: "מה צריך כדי להביא לקוח למעמד המכירה",
    needs: [
      "להבין למה הוא יבחר דווקא בכם",
      "לדעת מה בדיוק להגיד לו",
      "לדעת איפה לפגוש אותו",
      "לדעת מה הוא צריך לראות בכל שלב",
      "להוביל אותו מסקרנות ראשונית ועד לרגע שבו הוא מוכן לקנות",
    ],
    closing: "ולכן קמפיינים עובדים פחות טוב בשנים האחרונות. זה נקרא \"מסע לקוח\", אבל אנחנו במסע יחד איתו.",
  },
  intuition: "ואנסורה לא עובדת על \"נראה לי\"",
  science: {
    eyebrow: "05 · הידע שמאחורי",
    title: "שיווק הוא מקצוע שמבוסס על מדעי ההתנהגות",
    text: "יש מודלים, עקרונות, תיאוריה, לוגיקה, ויש הבנה עמוקה של התנהגות אנושית. אנסורה לא מחליטה מה לעשות לפי תחושת בטן, לפי טרנד רגעי או לפי מה שכולם עושים עכשיו. היא עובדת מתוך מסגרת מקצועית מסודרת, ונשענת על:",
    items: [
      "ידע במדעי ההתנהגות",
      "מודלים של קבלת החלטות",
      "לוגיקה של ערך לקוח",
      "עקרונות של מסע לקוח",
      "מערכת שלמה של סוכנים שמתמחים בחלקים שונים של החשיבה והשיווק",
    ],
    meaningTitle: "המשמעות",
    meaningLead: "לא כל רעיון הוא מבחינתה רעיון טוב.",
    meaningItems: ["לא כל פוסט צריך להיכתב.", "לא כל ערוץ מתאים לכל עסק.", "ולא כל מסר נכון לכל לקוח."],
    meaningText:
      "אנסורה אמורה לדעת לשאול למה, לבדוק מה התפקיד של הפעולה בתוך התוכנית, ולהכווין אתכם מתוך ידע מקצועי ולא מתוך ניחוש.",
  },
  learns: {
    eyebrow: "06 · ההתחלה",
    title: "והיא גם לומדת את העסק שלכם",
    cardTitle: "כן, בהתחלה אנחנו קצת חופרים לכם",
    text: "אנסורה היא מערכת אסטרטגיה ושיווק שנבנתה במיוחד עבור בעלי עסקים קטנים, והיא לא יכולה לעשות עבודה טובה בלי להכיר את העסק. אנחנו מרגישים עם זה די בנוח.",
    needsLead: "אנסורה צריכה לדעת:",
    needs: [
      "מה אתם מוכרים ולמי",
      "מה חשוב ללקוחות שלכם",
      "מה הם אומרים",
      "מה גורם להם לקנות",
      "אילו מוצרים יש לכם",
      "איך אתם רוצים להיתפס",
      "איזה תוכן מתאים לכם ואיזה תוכן אתם אוהבים",
      "ומה אתם מנסים להשיג",
    ],
    afterTitle: "אחר כך היא ממשיכה ללמוד",
    afterItems: ["עוד מידע נכנס לזיכרון העסק.", "עוד החלטות מצטברות.", "עוד תוכן נוצר.", "עוד תגובות מתקבלות."],
    afterText: "וככל שאנסורה מכירה את העסק טוב יותר, היא יכולה לחשוב טוב יותר עבורו.",
  },
  journey: {
    eyebrow: "07 · המסע",
    title: "מה אנסורה עושה עם כל הידע הזה?",
    text: "המטרה שלה היא להבין יחד איתכם מה צריך לגרום ללקוח להגיע למעמד המכירה כליד אורגני נכנס. לא רק לראות אתכם, לקרוא פוסט, לעשות לייק... אלא לעבור תהליך שבו הוא מכיר אתכם, מבין מה אתם עושים, מזהה שהפתרון מתאים לו, בונה אמון ובסוף פונה.",
    guideTitle: "אנסורה בונה את המסע, ואז מכוונת אתכם",
    guideLead: "אחרי שהמסע נבנה, היא מכוונת אתכם למה שצריך לעשות:",
    guideItems: ["באיזה שלב", "באיזו תדירות", "באיזה מסר", "ובאיזה פורמט"],
  },
  daily: {
    eyebrow: "08 · בית המלאכה",
    title: "איך נראה היום יום באנסורה?",
    imageAlt: "בית המלאכה של אנסורה",
    intro:
      "אתם לא פותחים כל בוקר דף ריק ושואלים מה תעלו היום. אנסורה כבר מכירה את העסק, את הקהלים, את מסע הלקוח ומה אתם מנסים להשיג.",
    stepsLead: "אתם נכנסים לבית המלאכה:",
    steps: [
      "רואים מה אפשר לעשות.",
      "בוחרים משימה, או מבקשים ממנה לחשוב איתכם - אנסורה מביאה רעיון.",
      "אתם מכוונים - היא מפתחת, מנסחת, מעצבת.",
      "ואתם מאשרים.",
    ],
    outro: "כך השיווק הופך מעוד משימה שבעל העסק צריך לזכור לעשות, לעבודה שוטפת שמתבצעת מתוך תוכנית.",
  },
  more: [],
  moreEyebrow: "09 · מה עוד",
  moreTitle: "מה עוד יש באנסורה",
  final: { title: "גם לעסק קטן מגיע מוח עסקי של עסק גדול", priceLine: "מחיר ההשקה: 247 שקלים בחודש" },
  footer: "מוח עסקי לעסקים קטנים",
};

const en: Content = {
  meta: {
    title: "Ansora – Even a small business deserves the business brain of a big one",
    description:
      "Ansora is a team that works for your business: a business consultant, a marketing manager, a content writer and a designer, all from the same knowledge and the same strategy. Launch price: 247 NIS a month.",
  },
  nav: { meet: "Meet her", why: "Why", price: "Price", other: "עברית", otherHref: "/", skip: "Skip to content" },
  ctaEnter: "I want to get into Ansora",
  ctaWork: "I want Ansora to work for me",
  hero: {
    small: "Even a small business deserves",
    big: "the business brain of a big one",
    lead: "Without a clear business horizon and a steady flow of customers, it doesn't stay only in the business. As owners we lose sleep, struggle to think ahead, the business doesn't grow and motivation wears down.",
    priceLine: "Launch price: 247 NIS a month",
    heroAlt: "",
  },
  what: {
    eyebrow: "01 · What she does",
    title: "Ansora was built to take on a big part of this thinking and work",
    cards: [
      "She knows your business",
      "She cracks your customer value",
      "She builds your customer journey",
      "And creates, with you, marketing content that brings customers",
    ],
    stay: {
      title: "You still need to be there",
      items: ["To steer.", "To approve.", "To correct when needed.", "To bring your professional knowledge."],
      text: "But you don't need to be your own strategic consultants, marketing managers, content writers and designers.",
    },
    brings: {
      title: "Ansora brings the ideas",
      items: ["She words them.", "Designs them.", "And publishes them."],
      text: "You go back to being a professional in your field and a business owner in your field. You just need to know how to operate Ansora.",
    },
  },
  team: {
    eyebrow: "02 · The team",
    title: "Ansora is a team that works for your business",
    imageAlt: "A business consultant, a marketing manager, a content writer and a designer",
    text: "They all work from the same knowledge of the business, the same strategy, the same customer journey, the same goals, and in the same place. No coordinating between several vendors, no explaining your business from scratch every time, no starting every task from a blank page, and above all, no one doing \"what everybody does\" for you.",
    priceLabel: "Launch price",
    tag: "For small business owners",
    priceUnit: "NIS a month",
  },
  meet: { eyebrow: "03 · Meet her", title: "Let's get to know her a little", demoAlt: "A demo of Ansora's screens" },
  why: {
    eyebrow: "04 · Why",
    title: "So why does anyone need this?",
    lead: "Because bringing in customers is getting harder. There is less money available in large parts of the market, many businesses compete for the same money, and customers want to do more than just check and compare.",
    wantTitle: "What customers want",
    wants: ["To get to know you, and see that it fits them exactly", "To build trust", "To see a business that is consistently present"],
    needTitle: "What it takes to bring a customer to the sale",
    needs: [
      "Understand why they would choose you in particular",
      "Know exactly what to tell them",
      "Know where to meet them",
      "Know what they need to see at every stage",
      "Lead them from first curiosity to the moment they are ready to buy",
    ],
    closing: "That is why campaigns have worked less well in recent years. It's called a \"customer journey\", but we are on the journey with them.",
  },
  intuition: "And Ansora doesn't work on \"I think so\"",
  science: {
    eyebrow: "05 · The knowledge behind it",
    title: "Marketing is a profession built on behavioral science",
    text: "There are models, principles, theory, logic, and a deep understanding of human behavior. Ansora doesn't decide what to do by gut feeling, by a passing trend, or by what everyone is doing right now. She works from an organized professional framework, and relies on:",
    items: [
      "Knowledge of behavioral science",
      "Decision-making models",
      "The logic of customer value",
      "Customer-journey principles",
      "A whole system of agents, each specializing in a different part of thinking and marketing",
    ],
    meaningTitle: "What it means",
    meaningLead: "Not every idea is a good idea, as far as she's concerned.",
    meaningItems: ["Not every post needs to be written.", "Not every channel suits every business.", "And not every message is right for every customer."],
    meaningText:
      "Ansora is meant to know how to ask why, to check what role an action plays within the plan, and to guide you from professional knowledge rather than guesswork.",
  },
  learns: {
    eyebrow: "06 · The start",
    title: "And she learns your business too",
    cardTitle: "Yes, at first we ask you a lot of questions",
    text: "Ansora is a strategy and marketing system built specifically for small business owners, and she can't do a good job without knowing the business. We're pretty comfortable with that.",
    needsLead: "Ansora needs to know:",
    needs: [
      "What you sell, and to whom",
      "What matters to your customers",
      "What they say",
      "What makes them buy",
      "What products you have",
      "How you want to be perceived",
      "What content suits you, and what content you like",
      "And what you are trying to achieve",
    ],
    afterTitle: "Then she keeps learning",
    afterItems: [
      "More information enters the business memory.",
      "More decisions accumulate.",
      "More content is created.",
      "More responses come in.",
    ],
    afterText: "And the better Ansora knows the business, the better she can think for it.",
  },
  journey: {
    eyebrow: "07 · The journey",
    title: "What does Ansora do with all this knowledge?",
    text: "Her goal is to work out with you what should lead a customer to the sale as an inbound organic lead. Not just seeing you, reading a post, giving a like... but going through a process in which they get to know you, understand what you do, recognize that the solution fits them, build trust, and finally reach out.",
    guideTitle: "Ansora builds the journey, then guides you",
    guideLead: "Once the journey is built, she guides you on what to do:",
    guideItems: ["At which stage", "How often", "With which message", "And in which format"],
  },
  daily: {
    eyebrow: "08 · The workshop",
    title: "What does a day with Ansora look like?",
    imageAlt: "Ansora's workshop",
    intro:
      "You don't open a blank page every morning and ask what to post today. Ansora already knows the business, the audiences, the customer journey and what you are trying to achieve.",
    stepsLead: "You enter the workshop:",
    steps: [
      "See what can be done.",
      "Pick a task, or ask her to think with you - Ansora brings an idea.",
      "You steer - she develops, words and designs.",
      "And you approve.",
    ],
    outro: "That is how marketing turns from one more task the owner has to remember into ongoing work that follows a plan.",
  },
  more: [],
  moreEyebrow: "09 · More",
  moreTitle: "What else is in Ansora",
  final: { title: "Even a small business deserves the business brain of a big one", priceLine: "Launch price: 247 NIS a month" },
  footer: "A business brain for small businesses",
};

export const CONTENT: Record<Lang, Content> = { he, en };
