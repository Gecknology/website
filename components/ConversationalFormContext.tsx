"use client";
import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import ConversationalForm from "@/components/ConversationalForm";

interface ConversationalFormContextType {
  openForm: () => void;
  closeForm: () => void;
}

const ConversationalFormContext = createContext<ConversationalFormContextType | undefined>(undefined);

export function useConversationalForm() {
  const ctx = useContext(ConversationalFormContext);
  if (!ctx) throw new Error("useConversationalForm must be used within ConversationalFormProvider");
  return ctx;
}

export function ConversationalFormProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const openForm = () => setOpen(true);
  const closeForm = () => setOpen(false);

  // Listen for the custom event to open the form
  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener('open-conversational-form', handler);
    return () => window.removeEventListener('open-conversational-form', handler);
  }, []);

  return (
    <ConversationalFormContext.Provider value={{ openForm, closeForm }}>
      {children}
      <ConversationalForm open={open} onClose={closeForm} />
    </ConversationalFormContext.Provider>
  );
}
