// src/app/layout.js
import { Inter, Outfit } from 'next/font/google'
import './globals.css'  // Make sure this import is present
import Header from '@/components/common/Header'
import Footer from '@/components/common/Footer'
import JsonLd from '@/components/JsonLd';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit' })

export const metadata = {
  title: 'Venu Gopal Boga | Full Stack Developer',
  description: 'Full Stack Developer specializing in AI-enhanced web solutions and modern web technologies, with expertise in Next.js, React, and Tailwind CSS.',
  keywords: ['Full Stack Developer', 'Web Development', 'Next.js', 'React', 'Tailwind CSS', 'AI Integration', 'Venu Gopal Boga'],
  authors: [{ name: 'Venu Gopal Boga' }],
  creator: 'Venu Gopal Boga',
  publisher: 'Venu Gopal Boga',
  metadataBase: new URL('https://vgb-profile.vercel.app/'),
  alternates: {
    canonical: '/',
  },

  icons: {
    icon: [
      { url: '/favicon.png', sizes: '48x48', type: 'image/png' },
    ],
    shortcut: '/favicon.png',
  },
  openGraph: {
    title: 'Venu Gopal Boga | Full Stack Developer',
    description: 'Full Stack Developer specializing in AI-enhanced web solutions and modern web technologies.',
    url: 'https://vgb-profile.vercel.app/',
    siteName: 'Venu Gopal Boga Portfolio',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Venu Gopal Boga - Full Stack Developer',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Venu Gopal Boga | Full Stack Developer',
    description: 'Full Stack Developer specializing in AI-enhanced web solutions and modern web technologies.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <head>
        {/* You can add additional head elements here if needed */}
      </head>
      <body className="bg-white" suppressHydrationWarning>
        {/* Add JsonLd component here */}
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "Venu Gopal Boga",
            "url": "https://vgb-profile.vercel.app/",
            "image": "https://vgb-profile.vercel.app/og-image.png",
            "jobTitle": "Full Stack Developer",
            "worksFor": {
              "@type": "Organization",
              "name": "Minimal Edge Technologies"
            },
            "sameAs": [
              "https://github.com/boga-venu",
              "https://linkedin.com/in/boga-venu-gopal"
            ],
            "description": "Full Stack Developer specializing in AI-enhanced web solutions and modern web technologies."
          }}
        />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}