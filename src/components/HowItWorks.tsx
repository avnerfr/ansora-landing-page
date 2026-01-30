import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { MedalIcon, MapIcon, PlaneIcon, GiftIcon } from "../components/Icons";

interface FeatureProps {
  icon: JSX.Element;
  title: string;
  description: string;
}

const features: FeatureProps[] = [
  {
    icon: <MedalIcon />,
<<<<<<< HEAD
    title: "Accessibility",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum quas provident cum",
  },
  {
    icon: <MapIcon />,
    title: "Community",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum quas provident cum",
  },
  {
    icon: <PlaneIcon />,
    title: "Scalability",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum quas provident cum",
  },
  {
    icon: <GiftIcon />,
    title: "Gamification",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum quas provident cum",
=======
    title: "Ingest Reality",
    description:
      "Ansora continuously absorbs real practitioner content from the wild",
  },
  {
    icon: <MapIcon />,
    title: "Structure Experience",
    description:
      "We map who's struggling, where, and why",
  },
  {
    icon: <PlaneIcon />,
    title: "What actually hurts",
    description:
      "Ansora shows you the pains your customers can't stop talking about. What breaks most often. Who it hits hardest. And which problems are just background noise.",
  },
  {
    icon: <GiftIcon />,
    title: "Write like an insider",
    description:
      "Pick a real pain. Write marketing that makes people say: \"That's my day-to-day.\"",
>>>>>>> 06dca25 (many initial changes to the pages)
  },
];

export const HowItWorks = () => {
  return (
    <section
<<<<<<< HEAD
      id="howItWorks"
      className="container text-center py-24 sm:py-32"
=======
      id="howitworks"
      className="container text-center py-24 sm:py-32 bg-[hsl(var(--section-bg-3))]"
>>>>>>> 06dca25 (many initial changes to the pages)
    >
      <h2 className="text-3xl md:text-4xl font-bold ">
        How It{" "}
        <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
          Works{" "}
        </span>
        Step-by-Step Guide
      </h2>
      <p className="md:w-3/4 mx-auto mt-4 mb-8 text-xl text-muted-foreground">
<<<<<<< HEAD
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veritatis
=======
        Sigal - add text here
>>>>>>> 06dca25 (many initial changes to the pages)
        dolor pariatur sit!
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map(({ icon, title, description }: FeatureProps) => (
          <Card
            key={title}
            className="bg-muted/50"
          >
            <CardHeader>
              <CardTitle className="grid gap-4 place-items-center">
                {icon}
                {title}
              </CardTitle>
            </CardHeader>
            <CardContent>{description}</CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};
