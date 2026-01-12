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
      <head>
        <script dangerouslySetInnerHTML={{
          __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-TQ7F2KDC');`
        }} />
      </head>
      <body className="min-h-screen flex flex-col">
        <noscript>
          <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-TQ7F2KDC"
            height="0" width="0" style={{display:'none',visibility:'hidden'}}></iframe>
        </noscript>
        <ConversationalFormProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </ConversationalFormProvider>
      </body>
    </html>
  );
}
