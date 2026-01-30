<<<<<<< HEAD
=======
import { useEffect, useRef, useState } from "react";
>>>>>>> 06dca25 (many initial changes to the pages)
import { Badge } from "./ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
<<<<<<< HEAD
import image from "../assets/growth.png";
import image3 from "../assets/reflecting.png";
import image4 from "../assets/looking-ahead.png";
=======
import person1 from "../assets/person1.png";
import person2 from "../assets/person2.png";
import person3 from "../assets/person3.png";
import person4 from "../assets/person4.png";
import person5 from "../assets/person5.png";
import person6 from "../assets/person6.png";

const GAP = 32;
const PAUSE_MS = 2000;
const SCROLL_DURATION_MS = 900;

function animateScroll(
  el: HTMLElement,
  from: number,
  to: number,
  durationMs: number,
  onComplete?: () => void
) {
  const start = performance.now();
  const step = (now: number) => {
    const t = Math.min((now - start) / durationMs, 1);
    const eased = 0.5 * (1 - Math.cos(t * Math.PI));
    el.scrollLeft = from + (to - from) * eased;
    if (t < 1) {
      requestAnimationFrame(step);
    } else {
      onComplete?.();
    }
  };
  requestAnimationFrame(step);
}
>>>>>>> 06dca25 (many initial changes to the pages)

interface FeatureProps {
  title: string;
  description: string;
  image: string;
}

const features: FeatureProps[] = [
  {
<<<<<<< HEAD
    title: "Responsive Design",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi nesciunt est nostrum omnis ab sapiente.",
    image: image4,
  },
  {
    title: "Intuitive user interface",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi nesciunt est nostrum omnis ab sapiente.",
    image: image3,
=======
    title: "How they actually say it",
    description:
      "See the exact words practitioners use when they talk about their work, and instantly spot where your copy sounds… not like that.",
    image: person1,
  },
  {
    title: "No theory. Just work.",
    description:
      "Every insight comes from a real breakdown in real work. No abstract pains. No imagined problems.",
    image: person2,
  },
  {
    title: "Always backed by reality",
    description:
      "Every insight links back to where it was actually said, from forum threads to the exact second in a podcast or video.",
    image: person3,
  },  {
    title: "Marketing Challenges",
    description:
      "Product Marketing can't keep up with the pace and complexity of technical products.",
    image: person4,
>>>>>>> 06dca25 (many initial changes to the pages)
  },
  {
    title: "AI-Powered insights",
    description:
<<<<<<< HEAD
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi nesciunt est nostrum omnis ab sapiente.",
    image: image,
=======
      "Messaging is often generic, surface-level, and misaligned with the true practitioner pains.",
    image: person5,
  },
  {
    title: "Transform Noise to Value",
    description:
      "Transforms raw, noisy technical conversations into structured value.",
    image: person6,
>>>>>>> 06dca25 (many initial changes to the pages)
  },
];

const featureList: string[] = [
  "Dark/Light theme",
  "Reviews",
  "Features",
  "Pricing",
  "Contact form",
  "Our team",
  "Responsive design",
  "Newsletter",
  "Minimalist",
];

export const Features = () => {
<<<<<<< HEAD
  return (
    <section
      id="features"
      className="container py-24 sm:py-32 space-y-8"
    >
      <h2 className="text-3xl lg:text-4xl font-bold md:text-center">
        Many{" "}
        <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
          Great Features
=======
  const scrollRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardWidth, setCardWidth] = useState(400);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const updateWidth = () => {
      const w = el.clientWidth;
      setCardWidth((w - GAP) / 2);
    };
    updateWidth();
    const ro = new ResizeObserver(updateWidth);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const stepCount = features.length + 1;
  const isAtDuplicateStart = currentIndex === features.length;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % stepCount);
    }, PAUSE_MS);
    return () => clearInterval(interval);
  }, [stepCount]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el || cardWidth < 1) return;

    const targetScroll = currentIndex * (cardWidth + GAP);

    const rafId = requestAnimationFrame(() => {
      const from = el.scrollLeft;
      if (isAtDuplicateStart) {
        animateScroll(el, from, targetScroll, SCROLL_DURATION_MS, () => {
          el.scrollLeft = 0;
          setCurrentIndex(0);
        });
      } else {
        animateScroll(el, from, targetScroll, SCROLL_DURATION_MS);
      }
    });
    return () => cancelAnimationFrame(rafId);
  }, [currentIndex, cardWidth, isAtDuplicateStart]);

  return (
    <section
      id="features"
      className="container py-24 sm:py-32 space-y-8 bg-[hsl(var(--section-bg-1))]"
    >
      <h2 className="text-3xl lg:text-4xl font-bold md:text-center">
        Ansora {" "}
        <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
          AI-Powered Insight Engine for Technical GTM Teams
>>>>>>> 06dca25 (many initial changes to the pages)
        </span>
      </h2>

      <div className="flex flex-wrap md:justify-center gap-4">
        {featureList.map((feature: string) => (
          <div key={feature}>
            <Badge
              variant="secondary"
              className="text-sm"
            >
              {feature}
            </Badge>
          </div>
        ))}
      </div>

<<<<<<< HEAD
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map(({ title, description, image }: FeatureProps) => (
          <Card key={title}>
            <CardHeader>
              <CardTitle>{title}</CardTitle>
            </CardHeader>

            <CardContent>{description}</CardContent>

            <CardFooter>
              <img
                src={image}
                alt="About feature"
                className="w-[200px] lg:w-[300px] mx-auto"
              />
            </CardFooter>
          </Card>
=======
      <div
        ref={scrollRef}
        className="flex overflow-x-auto overflow-y-hidden py-2 -mx-4 px-4 md:mx-0 md:px-0 scrollbar-hide"
        style={{ gap: GAP, scrollBehavior: "auto", scrollSnapType: "none" }}
      >
        {[...features, ...features].map(({ title, description, image }: FeatureProps, index) => (
          <div
            key={`${title}-${index}`}
            className="flex-shrink-0"
            style={{ width: cardWidth, minWidth: cardWidth }}
          >
            <Card className="h-full">
              <CardHeader>
                <CardTitle>{title}</CardTitle>
              </CardHeader>

              <CardContent>{description}</CardContent>

              <CardFooter>
                <img
                  src={image}
                  alt="About feature"
                  className="w-[200px] lg:w-[300px] mx-auto"
                />
              </CardFooter>
            </Card>
          </div>
>>>>>>> 06dca25 (many initial changes to the pages)
        ))}
      </div>
    </section>
  );
};
