import { NextResponse } from "next/server";
// Uses environment variables from .env.local or Vercel project settings:
// GOOGLE_SERVICE_ACCOUNT_JSON, GOOGLE_SHEET_ID, BREVO_API_KEY
import { sheets } from "@googleapis/sheets";
import { GoogleAuth } from "google-auth-library";

// Helper to verify Google reCAPTCHA (v2/v3)
async function verifyRecaptcha(token: string): Promise<boolean> {
  if (!process.env.RECAPTCHA_SECRET_KEY) return true; // If not set, skip
  const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`,
  });
  const data = await res.json();
  return !!data.success && (!data.score || data.score > 0.5);
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    // Honeypot field check (add a hidden field named 'website' in your form)
    if (data.website) {
      return NextResponse.json({ success: false, error: "Bot detected" }, { status: 400 });
    }
    // reCAPTCHA check (add recaptchaToken to your form data if using reCAPTCHA)
    if (data.recaptchaToken) {
      const valid = await verifyRecaptcha(data.recaptchaToken);
      if (!valid) {
        return NextResponse.json({ success: false, error: "Failed reCAPTCHA" }, { status: 400 });
      }
    }
    // Basic input validation
    if (!data.email || typeof data.email !== "string" || !data.email.includes("@") || !data.name || (!data.details && !data.question)) {
      return NextResponse.json({ success: false, error: "Invalid input" }, { status: 400 });
    }

    // 1. Append to Google Sheet (route to correct tab based on 'source')
    try {
      const serviceAccountJson = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
      if (!serviceAccountJson) throw new Error("Missing Google Service Account JSON");
      const auth = new GoogleAuth({
        credentials: JSON.parse(serviceAccountJson),
        scopes: ["https://www.googleapis.com/auth/spreadsheets"],
      });
      const sheetsApi = sheets({ version: "v4", auth });
      const spreadsheetId = process.env.GOOGLE_SHEET_ID;
      if (!spreadsheetId) throw new Error("Missing Google Sheet ID");
      // Determine which tab to use
      let tab = "ConversationalForm";
      if (data.source === "Contact") tab = "Contact";
      // Compose row based on source
      let row;
      if (tab === "Contact") {
        row = [data.name, data.organization, data.email, data.question];
      } else {
        row = [data.name, data.organization, data.email, Array.isArray(data.service) ? data.service.join(", ") : data.service, data.details];
      }
      await sheetsApi.spreadsheets.values.append({
        spreadsheetId,
        range: `${tab}!A1`,
        valueInputOption: "RAW",
        requestBody: {
          values: [row]
        }
      });
    } catch (err) {
      return NextResponse.json({ success: false, error: "Google Sheets append failed" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Invalid request" }, { status: 400 });
  }
}
