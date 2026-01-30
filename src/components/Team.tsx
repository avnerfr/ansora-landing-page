import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Facebook, Instagram, Linkedin } from "lucide-react";
<<<<<<< HEAD
=======
import sigalImg from "../assets/sigal.jpg";
import avnerImg from "../assets/avner.jpg";
>>>>>>> 06dca25 (many initial changes to the pages)

interface TeamProps {
  imageUrl: string;
  name: string;
  position: string;
<<<<<<< HEAD
=======
  description: string;
>>>>>>> 06dca25 (many initial changes to the pages)
  socialNetworks: SociaNetworkslProps[];
}

interface SociaNetworkslProps {
  name: string;
  url: string;
}

const teamList: TeamProps[] = [
  {
<<<<<<< HEAD
    imageUrl: "https://i.pravatar.cc/150?img=35",
    name: "Emma Smith",
    position: "Product Manager",
    socialNetworks: [
      {
        name: "Linkedin",
        url: "https://www.linkedin.com/in/leopoldo-miranda/",
      },
      {
        name: "Facebook",
        url: "https://www.facebook.com/",
=======
    imageUrl: sigalImg,
    name: "Sigal Malki",
    position: "Co-Founder and CEO",
    description:
      "Sigal brings a strong background in product operations and cross-functional execution. She specializes in translating user needs into structured processes, ensuring products are delivered with clarity, consistency, and attention to detail. Sigal plays a key role in aligning strategy, execution, and user experience.",
    socialNetworks: [
      {
        name: "Linkedin",
        url: "https://www.linkedin.com/in/sigal-mendel-malki-156062152/",
      },
      {
        name: "Facebook",
        url: "https://www.facebook.com/sigal.mendel.9",
>>>>>>> 06dca25 (many initial changes to the pages)
      },
      {
        name: "Instagram",
        url: "https://www.instagram.com/",
      },
    ],
  },
  {
<<<<<<< HEAD
    imageUrl: "https://i.pravatar.cc/150?img=60",
    name: "John Doe",
    position: "Tech Lead",
    socialNetworks: [
      {
        name: "Linkedin",
        url: "https://www.linkedin.com/in/leopoldo-miranda/",
      },
      {
        name: "Facebook",
        url: "https://www.facebook.com/",
      },
      {
        name: "Instagram",
        url: "https://www.instagram.com/",
      },
    ],
  },
  {
    imageUrl: "https://i.pravatar.cc/150?img=36",
    name: "Ashley Ross",
    position: "Frontend Developer",
    socialNetworks: [
      {
        name: "Linkedin",
        url: "https://www.linkedin.com/in/leopoldo-miranda/",
      },

      {
        name: "Instagram",
        url: "https://www.instagram.com/",
      },
    ],
  },
  {
    imageUrl: "https://i.pravatar.cc/150?img=17",
    name: "Bruce Rogers",
    position: "Backend Developer",
    socialNetworks: [
      {
        name: "Linkedin",
        url: "https://www.linkedin.com/in/leopoldo-miranda/",
      },
      {
        name: "Facebook",
        url: "https://www.facebook.com/",
=======
    imageUrl: avnerImg,
    name: "Avner Freiberger",
    position: "Co-Founder and CTO",
    description:
      "Avner is a data, AI, and analytics leader with deep experience building data-driven products from zero to scale. He has led advanced analytics and machine-learning initiatives across multiple industries, combining strong technical depth with a sharp understanding of real customer problems. Avner focuses on turning complex data into clear, actionable insights that drive business impact.",
    socialNetworks: [
      {
        name: "Linkedin",
        url: "https://www.linkedin.com/in/avnerfreiberger/",
      },
      {
        name: "Facebook",
        url: "https://www.facebook.com/avner.freiberger/",
      },
      {
        name: "Instagram",
        url: "https://www.instagram.com/avnerfr/",
>>>>>>> 06dca25 (many initial changes to the pages)
      },
    ],
  },
];

export const Team = () => {
  const socialIcon = (iconName: string) => {
    switch (iconName) {
      case "Linkedin":
        return <Linkedin size="20" />;

      case "Facebook":
        return <Facebook size="20" />;

      case "Instagram":
        return <Instagram size="20" />;
    }
  };

  return (
    <section
      id="team"
<<<<<<< HEAD
      className="container py-24 sm:py-32"
=======
      className="container py-24 sm:py-32 bg-[hsl(var(--section-bg-5))]"
>>>>>>> 06dca25 (many initial changes to the pages)
    >
      <h2 className="text-3xl md:text-4xl font-bold">
        <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
          Our Dedicated{" "}
        </span>
        Crew
      </h2>

      <p className="mt-4 mb-10 text-xl text-muted-foreground">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veritatis
        dolor pariatur sit!
      </p>

<<<<<<< HEAD
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 gap-y-10">
        {teamList.map(
          ({ imageUrl, name, position, socialNetworks }: TeamProps) => (
=======
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 gap-y-10 max-w-4xl mx-auto">
        {teamList.map(
          ({ imageUrl, name, position, description, socialNetworks }: TeamProps) => (
>>>>>>> 06dca25 (many initial changes to the pages)
            <Card
              key={name}
              className="bg-muted/50 relative mt-8 flex flex-col justify-center items-center"
            >
              <CardHeader className="mt-8 flex justify-center items-center pb-2">
                <img
                  src={imageUrl}
                  alt={`${name} ${position}`}
                  className="absolute -top-12 rounded-full w-24 h-24 aspect-square object-cover"
                />
                <CardTitle className="text-center">{name}</CardTitle>
                <CardDescription className="text-primary">
                  {position}
                </CardDescription>
              </CardHeader>

              <CardContent className="text-center pb-2">
<<<<<<< HEAD
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
=======
                <p>{description}</p>
>>>>>>> 06dca25 (many initial changes to the pages)
              </CardContent>

              <CardFooter>
                {socialNetworks.map(({ name, url }: SociaNetworkslProps) => (
                  <div key={name}>
                    <a
                      rel="noreferrer noopener"
                      href={url}
                      target="_blank"
                      className={buttonVariants({
                        variant: "ghost",
                        size: "sm",
                      })}
                    >
                      <span className="sr-only">{name} icon</span>
                      {socialIcon(name)}
                    </a>
                  </div>
                ))}
              </CardFooter>
            </Card>
          )
        )}
      </div>
    </section>
  );
};
