import { Code2, Headset, Workflow } from "lucide-react"
import { Button } from "./ui/button"

const features = [
  { icon: <Code2 className="w-7 h-7 text-primary" />, title: "Custom Integrations", desc: "Tailored automations to connect your favorite tools." },
  { icon: <Workflow className="w-7 h-7 text-primary" />, title: "Workflow Automations", desc: "Optimized workflows to enhance productivity." },
  { icon: <Headset className="w-7 h-7 text-primary" />, title: "Client-Centric Support", desc: "Expert guidance and care every step of the way." }
]

export default function Features() {
  return (
    <section id="features" className="py-18 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-semibold mb-12">What <span className="text-primary">Gecknology</span> Offers</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map(({ icon, title, desc }) => (
            <div key={title} className="bg-foreground rounded-xl p-6 shadow-lg">
              <h3 className="font-semibold text-2xl mb-2">{title}</h3>
              <p className="text-muted">{desc}</p>
              <div className="flex justify-center mt-4">{icon}</div>
            </div>
          ))}
        </div>
        <a href="/features">
          <Button className="mt-12 font-bold" size="lg">Learn More</Button>
        </a>
      </div>
    </section>
  )
}
