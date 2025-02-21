// src/app/layout.js
import { Inter, Outfit } from 'next/font/google'
import './globals.css'  // Make sure this import is present
import Header from '@/components/common/Header'
import Footer from '@/components/common/Footer'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit' })

export const metadata = {
  title: 'Venu Gopal Boga | Full Stack Developer',
  description: 'Full Stack Developer specializing in AI-enhanced web solutions and business transformation',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <body className="bg-white" suppressHydrationWarning>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}