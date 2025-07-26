"use client";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";

// Question array
const questions = [
  { id: "name", text: "What is your name?", type: "text" },
  {
    id: "organization",
    text: "What is the name of your organization?",
    type: "text",
  },
  {
    id: "email",
    text: "What email is best for us to follow up with you?",
    type: "text",
  },
  {
    id: "service",
    text: "Which features are you interested in? (Select all that apply)",
    type: "multi-options",
    options: [
      "Custom Integration",
      "Workflow Automation",
      "Solutions Consulting",
    ],
  },
  {
    id: "details",
    text: "Can you tell us more about the problem you are facing or the solution you are looking for?",
    type: "multiline",
  },
];

const API_ROUTE_URL = "/api/contact";

export default function ConversationalForm({
  open,
  onClose,
}: {
  open?: boolean;
  onClose?: () => void;
}) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<any>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  const current = questions[step];

  // Controlled input for text questions
  const [inputValue, setInputValue] = useState("");
  // For multi-options
  const [multiSelect, setMultiSelect] = useState<string[]>([]);

  // Reset input and multiSelect on step change
  React.useEffect(() => {
    setInputValue("");
    setMultiSelect([]);
  }, [step]);

  // Handle input for text and options
  const handleInput = (value: string | string[]) => {
    setAnswers((prev: any) => ({ ...prev, [current.id]: value }));
    // Only advance step if not last question
    if (step < questions.length - 1) {
      setStep((s) => s + 1);
    }
  };

  const handleMultiSelect = (option: string) => {
    setMultiSelect((prev) =>
      prev.includes(option)
        ? prev.filter((o) => o !== option)
        : [...prev, option]
    );
  };
  const handleMultiSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (multiSelect.length > 0) {
      handleInput(multiSelect);
    }
  };

  // Honeypot field state
  const [honeypot, setHoneypot] = useState("");
  // reCAPTCHA token state
  const [recaptchaToken, setRecaptchaToken] = useState("");

  // Handle form submission
  const handleSubmit = async () => {
    setSubmitting(true);
    // Ensure the last input is included in answers
    let finalAnswers = { ...answers };
    if (current.type === "text" || current.type === "multiline") {
      finalAnswers[current.id] = inputValue;
    } else if (current.type === "multi-options") {
      finalAnswers[current.id] = multiSelect;
    }
    // Add honeypot and recaptcha token to submission
    finalAnswers.website = honeypot;
    if (recaptchaToken) finalAnswers.recaptchaToken = recaptchaToken;
    try {
      const res = await fetch(API_ROUTE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(finalAnswers),
      });
      const result = await res.json();
      if (res.ok && result.success) {
        setSubmitted(true);
        setSubmitError(false);
      } else {
        setSubmitError(true);
      }
    } catch (e) {
      setSubmitError(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {open && (
        <div className="fixed inset-0 flex items-center justify-center bg-foreground/50 z-50">
          <div className="bg-muted-foreground rounded-lg shadow-lg p-6 relative max-w-md w-full mx-4 flex flex-col items-center">
            {/* Honeypot hidden field for bots */}
            <input
              type="text"
              name="website"
              value={honeypot}
              onChange={e => setHoneypot(e.target.value)}
              style={{ display: "none" }}
              tabIndex={-1}
              autoComplete="off"
            />
            {/* Google reCAPTCHA v2 widget moved to bottom, only on last question */}
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-primary transition-colors"
              onClick={onClose}
              aria-label="Close"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
            {submitted ? (
              <div className="p-6 text-xl text-primary-foreground text-center w-full">
                Thank you! We’ll be in touch soon.
              </div>
            ) : submitError ? (
              <div className="p-6 text-xl text-primary-foreground text-center w-full">
                We're sorry, there was an issue with your submission. Please try again later.
              </div>
            ) : (
              <>
                {/* Render current question */}
                <div className="mb-4 text-xl text-primary-foreground font-medium text-center w-full">
                  {current.text}
                </div>
                {current.type === "text" && (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (inputValue) {
                        if (step === questions.length - 1) {
                          handleInput(inputValue);
                          handleSubmit();
                        } else {
                          handleInput(inputValue);
                        }
                      }
                    }}
                    className="flex flex-col items-center w-full"
                  >
                    <input
                      className="border px-3 py-2 rounded-lg w-full mb-4 text-primary-foreground placeholder:text-primary-foreground-50 placeholder:text-sm "
                      type="text"
                      autoFocus
                      required
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      placeholder="Input your answer here"
                    />
                    {step === questions.length - 1 ? (
                      <Button type="submit" className="px-6 py-4 rounded-lg" disabled={submitting}>
                        {submitting ? "Sending..." : "Submit"}
                      </Button>
                    ) : (
                      <Button type="submit" className="px-6 py-4 rounded-lg">
                        Next
                      </Button>
                    )}
                  </form>
                )}
                {current.type === "multiline" && (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (inputValue && (current.id !== "details" || recaptchaToken)) {
                        if (step === questions.length - 1) {
                          handleInput(inputValue);
                          handleSubmit();
                        } else {
                          handleInput(inputValue);
                        }
                      }
                    }}
                    className="flex flex-col items-center w-full"
                  >
                    <textarea
                      className="border px-3 py-2 rounded-lg w-full mb-4 text-primary-foreground placeholder:text-primary-foreground-50 placeholder:text-sm resize-y min-h-[100px]"
                      required
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      placeholder="Input your answer here"
                      rows={4}
                    />
                    {/* Show reCAPTCHA only on the details question */}
                    {current.id === "details" && !submitted && (
                      <div className="mb-4 w-full flex justify-center">
                        <ReCAPTCHA
                          sitekey={String(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY)}
                          onChange={(token: string | null) => setRecaptchaToken(token || "")}
                        />
                      </div>
                    )}
                    {step === questions.length - 1 ? (
                      <Button type="submit" className="px-6 py-4 rounded-lg" disabled={submitting || (current.id === "details" && !recaptchaToken)}>
                        {submitting ? "Sending..." : "Submit"}
                      </Button>
                    ) : (
                      <Button type="submit" className="px-6 py-4 rounded-lg">
                        Next
                      </Button>
                    )}
                  </form>
                )}
                {/* Handle single options */}
                {current.type === "options" && (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (inputValue) {
                        if (step === questions.length - 1) {
                          handleInput(inputValue);
                          handleSubmit();
                        } else {
                          handleInput(inputValue);
                        }
                      }
                    }}
                    className="flex flex-col gap-2 items-center w-full"
                  >
                    {current.options!.map((opt: string) => (
                      <Button
                        key={opt}
                        type="button"
                        onClick={() => setInputValue(opt)}
                        className="px-6 py-4 rounded-lg"
                      >
                        {opt}
                      </Button>
                    ))}
                    {inputValue && (
                      step === questions.length - 1 ? (
                        <Button type="submit" className="px-6 py-4 rounded-lg" disabled={submitting}>
                          {submitting ? "Sending..." : "Submit"}
                        </Button>
                      ) : (
                        <Button type="submit" className="px-6 py-4 rounded-lg">
                          Next
                        </Button>
                      )
                    )}
                  </form>
                )}
                {/* Handle multi-options */}
                {current.type === "multi-options" && (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (multiSelect.length > 0) {
                        if (step === questions.length - 1) {
                          handleInput(multiSelect);
                          handleSubmit();
                        } else {
                          handleInput(multiSelect);
                        }
                      }
                    }}
                    className="flex flex-col gap-2 items-center w-full text-primary-foreground"
                  >
                    {current.options!.map((opt: string) => (
                      <label
                        key={opt}
                        className="pl-4 flex items-center gap-2 cursor-pointer w-full justify-center"
                      >
                        <input
                          type="checkbox"
                          checked={multiSelect.includes(opt)}
                          onChange={() => handleMultiSelect(opt)}
                        />
                        <span className="text-left w-full">{opt}</span>
                      </label>
                    ))}
                    {multiSelect.length > 0 && (
                      step === questions.length - 1 ? (
                        <Button className="mt-4 px-6 py-4 rounded-lg" type="submit" disabled={submitting}>
                          {submitting ? "Sending..." : "Submit"}
                        </Button>
                      ) : (
                        <Button className="mt-4 px-6 py-4 rounded-lg" type="submit">
                          Next
                        </Button>
                      )
                    )}
                  </form>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
