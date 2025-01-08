'use client'

import React, { useState, useEffect } from 'react'
import styles from './PasswordPage.module.css'

interface PasswordPageProps {
  onCorrectPassword: () => void
}

const PasswordPage: React.FC<PasswordPageProps> = ({ onCorrectPassword }) => {
  const [password, setPassword] = useState('')
  const [showIndicator, setShowIndicator] = useState(true)
  const [shake, setShake] = useState(false)

  useEffect(() => {
    const intervalId = setInterval(() => {
      setShowIndicator(prev => !prev)
    }, 530) // Blink every 530ms for a more natural feel

    return () => clearInterval(intervalId)
  }, [])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    e.preventDefault()
    if (e.key === 'Enter') {
      if (password === '5383') {
        onCorrectPassword()
      } else {
        setShake(true)
        setTimeout(() => {
          setShake(false)
          setPassword('')
        }, 500) // Reset after shake animation
      }
    } else if (e.key === 'Backspace') {
      setPassword(prev => prev.slice(0, -1))
    } else if (e.key.length === 1) {
      setPassword(prev => prev + e.key)
    }
  }

  return (
    <div className={styles.passwordPage} onKeyDown={handleKeyDown} tabIndex={0}>
      <div className={styles.passwordPrompt}>
        <div>enter password</div>
        <div className={`${styles.passwordInputContainer} ${shake ? styles.shake : ''}`}>
          <span className={`${styles.inputIndicator} ${showIndicator ? styles.visible : styles.hidden}`}>
            &gt;
          </span>
          <div className={styles.passwordInput}>
            {password && '•'.repeat(password.length)}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PasswordPage

