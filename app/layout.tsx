import React from 'react'
import './globals.css'

export const metadata = {
  title: '5383',
  description: '5383',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {children}
        <svg style={{ position: 'absolute', width: 0, height: 0 }}>
          <filter id="crtDistortion">
            <feTurbulence type="fractalNoise" baseFrequency="0.05 0.005" numOctaves="2" seed="1" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="1" xChannelSelector="R" yChannelSelector="G" />
            <feGaussianBlur stdDeviation="0.5" />
            <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1.3 0" />
          </filter>
        </svg>
      </body>
    </html>
  )
}

