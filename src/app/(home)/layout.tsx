import Header from '@/components/Header'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import StyledComponentsRegistry from '@/lib/registry'

import Head from './head'

import ReduxProvider from '@/lib/redux'

// import { GlobalStyle } from '@/styles/global'
const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <Head />
      <body className={inter.className}>
        <StyledComponentsRegistry>
          {/* <GlobalStyle /> */}
          <ReduxProvider>
            <Header />
            { children }
          </ReduxProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  )
}
