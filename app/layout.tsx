import "@/app/globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { ConversationalFormProvider } from "@/components/ConversationalFormContext";

export const metadata = {
  title: "Gecknology",
  description: "Solutions that stick"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <ConversationalFormProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </ConversationalFormProvider>
      </body>
    </html>
  );
}
