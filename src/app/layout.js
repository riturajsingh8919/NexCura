import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Noto_Sans } from "next/font/google";
import Providers from "./providers";
import Script from "next/script";

const notoSans = Noto_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

// export const metadata = {
//   title: "GenAI Healthcare",
//   description:
//     "GenAI Healthcare Inc. proudly receives the prestigious Best New Startup 2024 Award, recognizing our innovative contributions to healthcare technology and our commitment to transforming patient care through AI-driven solutions.",
// };

export default function RootLayout({ children }) {
  const websiteSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://www.genaihealth.care/#organization",
        "name": "GenAI Healthcare",
        "url": "https://www.genaihealth.care/",
        "logo": "https://www.genaihealth.care/path-to-logo.png",
        "sameAs": [
          "https://www.linkedin.com/company/gen-ai-healthcare",
          "https://www.facebook.com/Genai-Healthcare"
        ],
        "contactPoint": [
          {
            "@type": "ContactPoint",
            "telephone": "+1-404-777-6636",
            "contactType": "customer service",
            "areaServed": "USA",
            "availableLanguage": ["en"]
          }
        ],
        "description": "GenAI Healthcare: Advanced healthcare through cutting-edge AI-driven solutions."
      },
      {
        "@type": "WebSite",
        "@id": "https://www.genaihealth.care/#website",
        "url": "https://www.genaihealth.care/",
        "name": "GenAI Healthcare",
        "publisher": {
          "@id": "https://www.genaihealth.care/#organization"
        },
        "inLanguage": "en",
        "potentialAction": {
          "@type": "SearchAction",
          "target": "https://www.genaihealth.care/?s={search_term_string}",
          "query-input": "required name=search_term_string"
        }
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://www.genaihealth.care/#breadcrumb",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://www.genaihealth.care/"
          }
        ]
      },
      {
        "@type": "Person",
        "@id": "https://www.genaihealth.care/clinical-team#person1",
        "name": "Dr. Daniel Botelho",
        "jobTitle": "Chief Medical Officer",
        "affiliation": {
          "@id": "https://www.genaihealth.care/team-overview"
        }
      },
      {
        "@type": "Person",
        "@id": "https://www.genaihealth.care/clinical-team#person2",
        "name": "Felice Felser",
        "jobTitle": "MSN Advisory Product & Clinical Strategy",
        "affiliation": {
          "@id": "https://www.genaihealth.care/team-overview"
        }
      },
      {
        "@type": "Person",
        "@id": "https://www.genaihealth.care/clinical-team#person3",
        "name": "Dr. Srividhya Karunanithi",
        "jobTitle": "Senior Clinical Research Scientist",
        "affiliation": {
          "@id": "https://www.genaihealth.care/team-overview"
        }
      },
      {
        "@type": "Person",
        "@id": "https://www.genaihealth.care/clinical-team#person4",
        "name": "Dr. Dhanya Vijayakumar",
        "jobTitle": "Advisor - Clinical Solutions",
        "affiliation": {
          "@id": "https://www.genaihealth.care/team-overview"
        }
      }
    ]
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />

        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-SKENTQ2VVQ"
          strategy="afterInteractive"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-SKENTQ2VVQ');
            `,
          }}
        />

        {/* Microsoft Clarity */}
        <Script
          id="microsoft-clarity"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(c,l,a,r,i,t,y){
                  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "l4md77d8jx");
            `,
          }}
        />
      </head>
      <body className={`${notoSans.className} antialiased`}>
        <Providers>{children}</Providers>
      </body>
      {/* <body className={`${notoSans.className} antialiased`}>
        <Providers>
          <Header />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body> */}
    </html>
  );
}
  