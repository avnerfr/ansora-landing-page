import { useEffect, useRef, useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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

interface FeatureProps {
  title: string;
  description: string;
  image: string;
}

const features: FeatureProps[] = [
  {
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
    title: "When messaging falls behind reality",
    description:
      "Spot where your current messaging no longer reflects what your market is actually dealing with.",
    image: person4,
  },
  {
    title: "Insights from the field",
    description:
      "Understand what practitioners are struggling with based on real conversations, not assumptions or surveys.",
    image: person5,
  },
  {
    title: "From raw talk to real signal",
    description:
      "Turn messy threads, complaints, and debates into clear, structured patterns you can actually use.",
    image: person6,
  },
];

export const Features = () => {
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
        {" "}
        <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
          Understand your market’s pain, in their own words
        </span>
      </h2>

      <p className="text-xl text-muted-foreground text-center max-w-3xl mx-auto mb-8">
        Ansora turns real practitioner struggles into messaging that actually lands with technical buyers.
      </p>

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
        ))}
      </div>
    </section>
  );
};
