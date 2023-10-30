import React from 'react'
import { Inter } from 'next/font/google'

import StyledComponentsRegistry from '@/lib/registry'

import Head from './(home)/head'

import ReduxProvider from '@/lib/redux'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Head />
      <body className={inter.className}>
        <StyledComponentsRegistry>
          <ReduxProvider>
            { children }
          </ReduxProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  )
}
