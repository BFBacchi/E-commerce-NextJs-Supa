import React from 'react'

interface CardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
}

export function Card({ children, className = '', hover = false }: CardProps) {
  return (
    <div 
      className={`bg-white dark:bg-gray-800 rounded-3xl shadow-sm 
                 ${hover ? 'hover:shadow-lg transition-shadow duration-200' : ''} 
                 ${className}`}
    >
      {children}
    </div>
  )
}
