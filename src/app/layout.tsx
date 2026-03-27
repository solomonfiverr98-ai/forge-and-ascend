import type { Metadata } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Forge & Ascend | High-Ticket Coaching Accelerator",
  description:
    "Turn your expertise into a premium coaching business that runs without you. Join 200+ coaches who went from inconsistent $3k months to predictable $15k+ revenue.",
  keywords: [
    "high-ticket coaching",
    "coaching accelerator",
    "online coaching business",
    "premium coaching",
    "discovery calls",
    "coaching landing page",
  ],
  openGraph: {
    title: "Forge & Ascend | High-Ticket Coaching Accelerator",
    description:
      "Transform your coaching business with our proven system. Book your free strategy call today.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${jakarta.variable} antialiased`}
    >
      <body className="min-h-dvh bg-background text-text">
        {children}

        {/* Google Analytics */}
        {gaId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="ga-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}');
              `}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
