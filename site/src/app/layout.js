import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        
        {/* Primary Meta Tags */}
        <title>Tamboo Baba | Premium Event Management Services in India</title>
        <meta name="description" content="Tamboo Baba offers complete event management solutions including event planning, vendor coordination, and execution services for weddings, corporate events, and more." />
        <meta name="keywords" content="event management, wedding planning, corporate events, event organizers, India" />
        
        {/* Open Graph / Facebook Meta Tags */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://tamboobaba.com/" />
        <meta property="og:title" content="Tamboo Baba | Premium Event Management Services" />
        <meta property="og:description" content="Complete event management solutions for weddings, corporate events, and special occasions." />
        <meta property="og:image" content="https://tamboobaba.com/hero-image.png" />
        
        {/* Twitter Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Tamboo Baba | Premium Event Management Services" />
        <meta name="twitter:description" content="Complete event management solutions for weddings, corporate events, and special occasions." />
        <meta name="twitter:image" content="https://tamboobaba.com/hero-image.png" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://tamboobaba.com/" />
        
        {/* Favicon */}
        <link rel="icon" href="/seo/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/seo/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/seo/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/seo/favicon-16x16.png" />
        <link rel="manifest" href="/seo/site.webmanifest" />
        
        {/* Preconnect to important domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "EventPlanningBusiness",
            "name": "Tamboo Baba",
            "image": "https://tamboobaba.com/hero-image.png",
            "description": "Premium event management services provider",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Ludhiana",
              "addressRegion": "Punjab",
              "postalCode": "141001",
              "addressCountry": "IN"
            },
            "telephone": "+917355260895",
            "url": "https://tamboobaba.com"
          })}
        </script>
      </head>
      <body className="font-sans bg-gray-50 min-h-screen">
        <div className="flex flex-col min-h-screen">
          {children}
        </div>
      </body>
    </html>
  );
}