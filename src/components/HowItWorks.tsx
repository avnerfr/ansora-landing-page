import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { MedalIcon, MapIcon, PlaneIcon, GiftIcon , CryIcon, EkgIcon, NotepadIcon, ToolsIcon} from "../components/Icons";
import { Icon } from "lucide-react";

interface FeatureProps {
  icon: JSX.Element;
  title: string;
  description: string;
}

const features: FeatureProps[] = [
  {
    icon: <MedalIcon />,
    title: "Ingest Reality",
    description:
      "Ansora continuously listens to real practitioners, across forums, Slack, podcasts, and more",
  },
  {
    icon: < ToolsIcon />,
    title: "Structure the experience",
    description:
      "We map who’s struggling, where it happens, and what keeps coming up",
  },
  {
    icon: <EkgIcon />,
    title: "Find what actually hurts",
    description:
      "See the pains people repeat, escalate, and get stuck onnot one-off complaints.,",
  },
  {
    icon: <NotepadIcon />,
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
