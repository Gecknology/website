"use client";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    organization: "",
    email: "",
    question: "",
  });
  const [recaptchaToken, setRecaptchaToken] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!recaptchaToken) {
      alert("Please verify you are not a robot.");
      return;
    }
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, source: "Contact", recaptchaToken }),
      });
      const result = await res.json();
      if (res.ok && result.success) {
        alert("Thank you! Your message has been sent.");
        setForm({ name: "", organization: "", email: "", question: "" });
        setRecaptchaToken("");
      } else {
        alert("There was an error submitting the form. Please try again.");
      }
    } catch (err) {
      alert("There was an error submitting the form. Please try again.");
    }
  };

  return (
    <section id="features" className="py-12 px-4 md:px-12">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-5xl font-bold mb-12">
          Contact Us
        </h2>
      </div>
      {/* Contact form */}
      <div className="max-w-lg mx-auto mt-12 p-6 bg-foreground rounded-xl shadow-lg">
        <h4 className="text-lg text-muted-foreground text-center mb-4">We&#39;d love to hear from you! <br /> Please fill out the form below.</h4>
        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name" className="block mb-1 font-medium">Name</label>
            <Input id="name" name="name" value={form.name} onChange={handleChange} required />
          </div>
          <div>
            <label htmlFor="organization" className="block mb-1 font-medium">Organization</label>
            <Input id="organization" name="organization" value={form.organization} onChange={handleChange} required />
          </div>
          <div>
            <label htmlFor="email" className="block mb-1 font-medium">Email</label>
            <Input id="email" name="email" type="email" value={form.email} onChange={handleChange} required />
          </div>
          <div>
            <label htmlFor="question" className="block mb-1 font-medium">Question</label>
            <Textarea id="question" name="question" value={form.question} onChange={handleChange} required rows={5} />
          </div>
          <div className="flex justify-center">
            <ReCAPTCHA
              sitekey={String(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY)}
              onChange={(token: string | null) => setRecaptchaToken(token || "")}
            />
          </div>
          <Button type="submit" variant="outline" className="mt-2 font-bold" size="lg" disabled={!recaptchaToken}>Submit</Button>
        </form>
      </div>
    </section>
  );
}