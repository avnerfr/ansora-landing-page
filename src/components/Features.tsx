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
const CLICK_PAUSE_MS = 3000;

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
      "See the words your buyers really use, and spot where your copy misses.",
    image: person1,
  },
  {
    title: "No theory. Just work.",
    description:
      "Every insight comes from real breakdowns in real workflows.",
    image: person2,
  },
  {
    title: "Always backed by reality",
    description:
      "Every insight links back to where it was actually said.",
    image: person3,
  },  {
    title: "When messaging falls behind",
    description:
      "Your market moved on. Your messaging didn’t.",
    image: person4,
  },
  {
    title: "Insights from the field",
    description:
      "Real problems, straight from real people. No surveys. No guessing.",
    image: person5,
  },
  {
    title: "From raw talk to real signal",
    description:
      "Messy threads in. Clear patterns out.",
    image: person6,
  },
];

const TAP_MOVE_THRESHOLD_PX = 10;
const TAP_MAX_DURATION_MS = 400;

export const Features = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const pauseTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pointerStartRef = useRef<{ x: number; t: number } | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardWidth, setCardWidth] = useState(400);
  const [isAutoAdvancePaused, setIsAutoAdvancePaused] = useState(false);

  const handleCardClick = () => {
    if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
    setIsAutoAdvancePaused(true);
    pauseTimeoutRef.current = setTimeout(() => {
      pauseTimeoutRef.current = null;
      setIsAutoAdvancePaused(false);
    }, CLICK_PAUSE_MS);
  };

  const handleCardPointerDown = (e: React.PointerEvent) => {
    pointerStartRef.current = { x: e.clientX, t: Date.now() };
  };

  const handleCardPointerUp = (e: React.PointerEvent) => {
    const start = pointerStartRef.current;
    pointerStartRef.current = null;
    if (!start) return;
    const dx = Math.abs(e.clientX - start.x);
    const dt = Date.now() - start.t;
    if (dx <= TAP_MOVE_THRESHOLD_PX && dt <= TAP_MAX_DURATION_MS) {
      handleCardClick();
    }
  };

  useEffect(() => {
    return () => {
      if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
    };
  }, []);

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
    if (isAutoAdvancePaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % stepCount);
    }, PAUSE_MS);
    return () => clearInterval(interval);
  }, [stepCount, isAutoAdvancePaused]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el || cardWidth < 1 || isAutoAdvancePaused) return;

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
  }, [currentIndex, cardWidth, isAtDuplicateStart, isAutoAdvancePaused]);

  return (
    <section
      id="features"
      className="container py-24 sm:py-32 space-y-8 bg-[hsl(var(--section-bg-1))]"
    >
      <h2 className="text-3xl lg:text-4xl font-bold md:text-center">
        {" "}
        <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
        Hear what your market is really saying
        </span>
      </h2>

      <p className="text-xl text-muted-foreground text-center max-w-3xl mx-auto mb-8">
      Not surveys. Not assumptions. Real struggles, in their own words.
      </p>

      <div
        ref={scrollRef}
        className="flex overflow-x-auto overflow-y-hidden py-2 -mx-4 px-4 md:mx-0 md:px-0 scrollbar-hide touch-pan-x touch-pan-y"
        style={{ gap: GAP, scrollBehavior: "auto", scrollSnapType: "none" }}
        onTouchStart={() => setIsAutoAdvancePaused(true)}
        onPointerDown={() => setIsAutoAdvancePaused(true)}
        onWheel={() => setIsAutoAdvancePaused(true)}
      >
        {[...features, ...features].map(({ title, description, image }: FeatureProps, index) => (
          <div
            key={`${title}-${index}`}
            className="flex-shrink-0 cursor-pointer touch-pan-x touch-pan-y"
            style={{ width: cardWidth, minWidth: cardWidth }}
            onPointerDown={handleCardPointerDown}
            onPointerUp={handleCardPointerUp}
            onPointerCancel={() => { pointerStartRef.current = null; }}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleCardClick();
              }
            }}
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
