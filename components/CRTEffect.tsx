'use client'

import React, { useRef, useEffect, useState } from 'react'
import styles from './CRTEffect.module.css'

interface CRTEffectProps {
  children: React.ReactNode
}

const CRTEffect: React.FC<CRTEffectProps> = ({ children }) => {
  const crtRef = useRef<HTMLDivElement>(null)
  const [audioStarted, setAudioStarted] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (crtRef.current) {
        const { left, top, width, height } = crtRef.current.getBoundingClientRect()
        const x = (e.clientX - left) / width
        const y = (e.clientY - top) / height

        crtRef.current.style.setProperty('--mouse-x', `${x}`)
        crtRef.current.style.setProperty('--mouse-y', `${y}`)
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useEffect(() => {
    const audio = new Audio('/static-hum.mp3')
    audio.loop = true
    audio.volume = 0.25

    const timeoutId = setTimeout(() => {
      audio.play().catch(error => console.log('Audio playback failed:', error))
      setAudioStarted(true)
    }, 5000) // 5 seconds delay

    return () => {
      clearTimeout(timeoutId)
      if (audioStarted) {
        audio.pause()
        audio.currentTime = 0
      }
    }
  }, [audioStarted])

  return (
    <div className={styles.crtContainer}>
      <div className={styles.crtWrapper} ref={crtRef}>
        <div className={styles.crtContent}>{children}</div>
        <div className={styles.crtScanlines}></div>
        <div className={styles.crtFlicker}></div>
        <div className={styles.crtCorners}></div>
      </div>
    </div>
  )
}

export default CRTEffect

