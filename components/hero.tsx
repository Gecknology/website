"use client";
import { Button } from "@/components/ui/button";
import { useConversationalForm } from "@/components/ConversationalFormContext";
import Image from "next/image";

export default function Hero() {
  const { openForm } = useConversationalForm();
  return (
    <section id="hero" className="text-center items-center py-18 px-2 sm:px-6 mx-auto">
      <div className="text-center max-w-4xl mx-auto p-6 sm:p-16 bg-foreground rounded-xl shadow-lg">
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold font-body mb-4 sm:mb-6 md:mb-8 text-primary flex items-center justify-center">
          <Image
            src="/Gecknology_logo.png"
            alt="Gecknology Logo"
            className="h-[1em] w-auto"
            width={120}
            height={120}
            style={{ display: "inline-block" }}
          />
          <span>Gecknology</span>
        </h1>
        <h2 className="text-lg sm:text-2xl italic font-medium mb-4 sm:mb-6 text-muted-foreground">
          &ldquo;Solutions that Stick.&rdquo;
        </h2>
        <p className="text-base sm:text-lg text-muted mb-6 sm:mb-8">
          Custom integrations, workflow automations, and client-centric support serving your non-profit organization.
        </p>
        <Button size="xl" variant="outline" className="font-bold w-full sm:w-auto" onClick={openForm}>
          Book Time Now
        </Button>
      </div>
    </section>
  );
}
