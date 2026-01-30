import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQProps {
  question: string;
  answer: string;
  value: string;
}

const FAQList: FAQProps[] = [
  {
<<<<<<< HEAD
    question: "Is this template free?",
    answer: "Yes. It is a free ChadcnUI template.",
    value: "item-1",
  },
  {
    question: "Lorem ipsum dolor sit amet consectetur adipisicing elit?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sint labore quidem quam? Consectetur sapiente iste rerum reiciendis animi nihil nostrum sit quo, modi quod.",
    value: "item-2",
  },
  {
    question:
      "Lorem ipsum dolor sit amet  Consectetur natus dolores minus quibusdam?",
    answer:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Labore qui nostrum reiciendis veritatis necessitatibus maxime quis ipsa vitae cumque quo?",
    value: "item-3",
  },
  {
    question: "Lorem ipsum dolor sit amet, consectetur adipisicing elit?",
    answer: "Lorem ipsum dolor sit amet consectetur, adipisicing elit.",
    value: "item-4",
  },
  {
    question:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur natus?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sint labore quidem quam? Consectetur sapiente iste rerum reiciendis animi nihil nostrum sit quo, modi quod.",
=======
    question: "Is this another AI copy tool?",
    answer: "No. Ansora doesn’t invent. It translates reality. It works only with what practitioners already say when work breaks.",    value: "item-1",
  },
  {
    question: "Where does the data come from?",    answer:
    "From real environments: technical forums, blogs, podacasts and YouTube channels.",  value: "item-2",
  },
  {
    question:
    "What makes this different from “customer research”?",
    answer:
    "Research asks questions. Ansora listens to what people say when no one is asking.",    value: "item-3",
  },
  {
    question:
      "Can I use this on existing copy?",
    answer:
      "Yes. Drop any text in and see, line by line, where it aligns with the market, and where it drifts.",
    value: "item-4",
  },
  {
    question: "How do we get started with Ansora?",
    answer: "Book a short demo to align on your market and audience. Onboarding takes minutes. You then get a full month to explore Ansora hands-on, free. By the end of the month, it’s very clear whether Ansora reflects your market’s reality or not.",
>>>>>>> 06dca25 (many initial changes to the pages)
    value: "item-5",
  },
];

export const FAQ = () => {
  return (
    <section
      id="faq"
<<<<<<< HEAD
      className="container py-24 sm:py-32"
=======
      className="container py-24 sm:py-32 bg-[hsl(var(--section-bg-6))]"
>>>>>>> 06dca25 (many initial changes to the pages)
    >
      <h2 className="text-3xl md:text-4xl font-bold mb-4">
        Frequently Asked{" "}
        <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
          Questions
        </span>
      </h2>

      <Accordion
        type="single"
        collapsible
        className="w-full AccordionRoot"
      >
        {FAQList.map(({ question, answer, value }: FAQProps) => (
          <AccordionItem
            key={value}
            value={value}
          >
            <AccordionTrigger className="text-left">
              {question}
            </AccordionTrigger>

            <AccordionContent>{answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <h3 className="font-medium mt-4">
        Still have questions?{" "}
        <a
          rel="noreferrer noopener"
          href="#"
          className="text-primary transition-all border-primary hover:border-b-2"
        >
          Contact us
        </a>
      </h3>
    </section>
  );
};
