"use client";
import {
  Code2,
  Headset,
  Workflow,
  Presentation,
  HeartHandshake,
  Cloud,
  Repeat,
  ArrowLeftRight,
  ClipboardCheck,
  Shrub,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import LogoCarousel from "@/components/ui/LogoCarousel";

const features = [
  {
    icon: <Code2 className="w-14 h-14 text-primary mx-auto" />,
    title: "Custom Integrations",
    desc: "Tailored automations to connect your favorite tools.",
    encouragement: "Don't see your favorite tool above? Don't stress—we will find a way to integrate with it!",
  },
  {
    icon: <Workflow className="w-14 h-14 text-primary mx-auto" />,
    title: "Workflow Automations",
    desc: "Optimized workflows to enhance productivity.",
    encouragement: "Whatever your productivity and automation needs, we can help!",
    examples: [
      {
        label: "Eliminate Manual Data Entry",
        icon: <ClipboardCheck className="w-12 h-12 text-primary" />,
      },
      {
        label: "Sync Your Data",
        icon: <ArrowLeftRight className="w-12 h-12 text-primary" />,
      },
      {
        label: "Automate Repetitive Tasks",
        icon: <Repeat className="w-12 h-12 text-primary" />,
      },
    ],
  },
  {
    icon: <Headset className="w-14 h-14 text-primary mx-auto" />,
    title: "Client-Centric Support",
    desc: "Expert guidance and care every step of the way.",
    encouragement: "We are here to help support you and your team succeed!",
    examples: [
      {
        label: "Flexible Delivery",
        icon: <Cloud className="w-12 h-12 text-primary" />,
      },
      {
        label: "Ongoing Support",
        icon: <HeartHandshake className="w-12 h-12 text-primary" />,
      },
      {
        label: "Training and Enablement",
        icon: <Presentation className="w-12 h-12 text-primary" />,
      },
      {
        label: "Mission Driven",
        icon: <Shrub className="w-12 h-12 text-primary" />,
      },
    ],
  },
];

export default function FeaturesPage() {
  return (
    <section id="features" className="py-12 px-4 md:px-12">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-5xl font-bold mb-12">
          What <span className="text-primary">Gecknology</span> Offers
        </h2>
        <div className="relative">
          <Carousel className="w-full max-w-4xl mx-auto">
            <CarouselContent>
              {features.map((feature) => (
                <CarouselItem
                  key={feature.title}
                  className="flex justify-center"
                >
                  <div className="bg-foreground rounded-3xl p-14 shadow-2xl w-full max-w-2xl mx-auto flex flex-col items-center">
                    {feature.icon}
                    <h3 className="font-semibold text-4xl mt-8 mb-4">
                      {feature.title}
                    </h3>
                    <p className="text-muted text-2xl mb-8">{feature.desc}</p>
                    {/* Only show LogoCarousel below text for the first card */}
                    {feature.title === "Custom Integrations" && (
                      <div className="w-full flex justify-center mt-6">
                        <LogoCarousel size={20} />
                      </div>
                    )}
                    {/* Encouragement section below examples, customizable per card */}
                    {feature.title === "Custom Integrations" && feature.encouragement && (
                      <p className="text-lg text-muted mt-4 mb-0">
                        {feature.encouragement}
                      </p>
                    )}
                    {/* Render examples for each card type as icon-based rows */}
                    {feature.examples && feature.examples.length > 0 && (
                      <>
                        <div className="w-full mt-4 mb-8 flex items-center justify-center">
                          <div className="flex flex-row items-center justify-center gap-8 w-full">
                            {feature.examples.map((ex, idx) => (
                              "icon" in ex ? (
                                <div key={ex.label + idx} className="flex flex-col items-center">
                                  {ex.icon}
                                  <span className="mt-2 text-base font-medium text-muted-foreground text-center">{ex.label}</span>
                                </div>
                              ) : null
                            ))}
                          </div>
                        </div>
                        {/* Encouragement section below examples, customizable per card */}
                        {feature.encouragement && (
                          <p className="text-lg text-muted mt-4 mb-0">
                            {feature.encouragement}
                          </p>
                        )}
                      </>
                    )}
                    <Button
                      className="font-bold mt-12"
                      size="xl"
                      variant="outline"
                      onClick={() => {
                        if (typeof window !== "undefined") {
                          const event = new CustomEvent(
                            "open-conversational-form"
                          );
                          window.dispatchEvent(event);
                        }
                      }}
                    >
                      Book Time Now
                    </Button>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>
    </section>
  );
}
