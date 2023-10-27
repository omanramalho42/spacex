import Header from '@/components/Header'

import { Inter } from 'next/font/google'

import StyledComponentsRegistry from '@/lib/registry'

import Head from './head'

import ReduxProvider from '@/lib/redux'
import React from 'react'

// import { GlobalStyle } from '@/styles/global'
const inter = Inter({ subsets: ['latin'] })

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps ) {
  return (
    <html lang="en">
      <Head />
      <body className={inter.className}>
        <StyledComponentsRegistry>
          <ReduxProvider>
            <Header />
            { children }
          </ReduxProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  )
}
