import Hero from "@/components/hero"
import Features from "@/components/features"
import { Separator } from "@/components/ui/separator"

export const metadata = {
  title: "Gecknology - Solutions That Stick",
  description: "Custom integrations, workflow automations, and client-centric support for nonprofit organizations."
};

export default function Home() {
  return (
    <>
      <Hero />
      <Separator />
      <Features />
    </>
  )
}
