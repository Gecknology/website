"use client";
import React from "react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function AboutPage() {
  const [showMore, setShowMore] = React.useState(false);
  return (
    <section className="py-12 px-4 md:px-12 max-w-4xl mx-auto">
      <h1 className="text-5xl font-bold mb-8 text-center">About <span className="font-semibold text-primary">Gecknology</span></h1>
      {/* Overlay 1: About Gecknology */}
      <div className="mb-12">
        <div className="bg-foreground rounded-2xl shadow-lg p-8 border border-primary/20">
          <div className="text-lg leading-relaxed text-muted-foreground">
            <p className="mb-4">
              <span className="font-semibold text-primary">Gecknology</span> specializes in custom integrations, workflow automations, and client-centric support for nonprofit organizations. We help you connect your favorite tools, automate repetitive tasks, and streamline your operations so you can focus on your mission.
            </p>
          </div>
        </div>
      </div>

      <Separator />

      {/* Overlay 2: Meet the Founder */}
      <div className="py-18 px-6 flex flex-col items-center">
        <h2 className="text-3xl font-semibold mb-12">Meet <span className="font-semibold text-primary">Gecknology&#39;s</span> Founder</h2>
        <div className="flex-shrink-0 w-60 h-60 rounded-full overflow-hidden border-2 border-muted-foreground mb-8 shadow-lg">
          <Image src="/profile.jpg" alt="Founder Profile" width={240} height={240} className="object-cover w-full h-full" />
        </div>
        <div className="text-lg text-muted-foreground text-center mb-4">
          <h3 className="font-semibold text-2xl">Hello there!</h3>
          <p className="mt-2">Click below if you want to learn more about me and <br /> my passion for Gecknology.</p>
        </div>
        <Button
          className="font-bold mb-8"
          size="lg"
          onClick={() => setShowMore((v) => !v)}
          aria-expanded={showMore}
          aria-controls="about-founder-card"
        >
          {showMore ? 'Hide bio' : 'Read more'}
        </Button>
        {showMore && (
          <div
            id="about-founder-card"
            className="bg-foreground rounded-2xl shadow-lg p-8 border border-primary/20 w-full max-w-2xl animate-fade-in"
          >
            <div className="text-lg text-muted-foreground">
              <p className="mb-4">
                Hi, I&#39;m Sean, the founder of Gecknology. Much of my career was in the nonprofit sector, where I saw firsthand how technology can empower organizations to do more good, or can be the biggest barrier to success.
              </p>
              <p>
                Now with the experience of a seasoned Solutions Architect, my aim is to enable nonprofits to maximize their impact through technology.
                Nonprofits face unique challenges: tight budget constraints, limited staff, volunteer management, fundraising, and more. The need for reliable, easy-to-use tools is paramount. My goal is to be a trusted partner who delivers real value, transparency, and ongoing support.
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}