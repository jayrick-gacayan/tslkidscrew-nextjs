import { Montserrat } from 'next/font/google'
import type { Metadata } from 'next'

import './globals.css'
import Providers from './_sections/providers'
export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

const montserrat = Montserrat({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
  fallback: ['system-ui', 'arial'],
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <Providers>
        <body className={`${montserrat.className} bg-default`}>
          {children}
        </body>
      </Providers>
    </html>
  )
}
