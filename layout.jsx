import './globals.css'

export const metadata = {
  title: 'Silent Emergency — Your Silent Guardian',
  description: 'Smart emergency protection powered by real-time AI safety monitoring. Always watching. Never intrusive.',
  keywords: 'emergency app, safety app, personal safety, SOS, silent emergency',
  openGraph: {
    title: 'Silent Emergency — Your Silent Guardian',
    description: 'Smart emergency protection powered by real-time AI safety monitoring.',
    type: 'website',
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#080A0E',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Syne:wght@600;700;800&display=swap"
          rel="stylesheet"
        />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="format-detection" content="telephone=no" />
      </head>
      <body>{children}</body>
    </html>
  )
}
