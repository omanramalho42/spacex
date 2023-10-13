import React from 'react'

interface LayoutProps {
  children: React.ReactNode 
}

const layout = ({ children }: LayoutProps) => {
  return (
    <section>{ children }</section>
  )
}

export default layout