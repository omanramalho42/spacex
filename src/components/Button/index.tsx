import React from 'react'

export interface ButtonProps {
  children: React.ReactNode;
  onMouseOver?: () => void;
  onClick?: () => void;
  onMouseLeave?: () => void;
  url?: string;
}

export const Button = ({ 
  children, 
  onMouseOver, 
  onMouseLeave, 
  onClick, 
  ...rest 
}: ButtonProps ) => {
  return (
    <button 
      disabled 
      style={{ 
        all: 'unset', 
        cursor: 'pointer' 
      }} 
      role='contentinfo' 
      onMouseLeave={onMouseLeave} 
      onMouseOver={onMouseOver} 
      onClick={onClick}
      {...rest} 
    >
      { children }
    </button>
  )
}