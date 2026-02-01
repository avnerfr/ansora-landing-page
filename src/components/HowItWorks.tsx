import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import hiw_icon1 from "@/assets/hiw_icon1.png";
import hiw_icon2 from "@/assets/hiw_icon2.png";
import hiw_icon3 from "@/assets/hiw_icon3.png";
import hiw_icon4 from "@/assets/hiw_icon4.png";

interface FeatureProps {
  icon: string;
  title: string;
  description: string;
}

const features: FeatureProps[] = [
  {
    icon: hiw_icon1,
    title: "Ingest Reality",
    description:
      "Ansora continuously listens to real practitioners, across forums, Slack, podcasts, and more",
  },
  {
    icon: hiw_icon2,
    title: "Structure the experience",
    description:
      "We map who’s struggling, where it happens, and what keeps coming up",
  },
  {
    icon: hiw_icon3,
    title: "Find what actually hurts",
    description:
      "See the pains people repeat, escalate, and get stuck onnot one-off complaints.,",
  },
  {
    icon: hiw_icon4,
    title: "Write like an insider",
    description:
      "Use real language from real moments, the kind that makes people say:\n“Yeah. That’s my day.”",
  },
];

export const HowItWorks = () => {
  return (
    <section
      id="howitworks"
      className="container text-center py-24 sm:py-32"
    >
      <h2 className="text-3xl md:text-4xl font-bold ">
        How {" "}
        <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
          Ansora{" "}
        </span>
        turns noise into signal
      </h2>
      <p className="md:w-3/4 mx-auto mt-4 mb-8 text-xl text-muted-foreground">
        From raw conversations to insights you can actually use
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map(({ icon, title, description }: FeatureProps) => (
          <Card
            key={title}
            className="bg-muted/50"
          >
            <CardHeader>
              <CardTitle className="grid gap-4 place-items-center">
                <img src={icon} alt="" className="w-12 h-12 object-contain" aria-hidden />
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
