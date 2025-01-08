'use client'

import React, { useState } from 'react'
import CRTEffect from '../components/CRTEffect'
import PasswordPage from '../components/PasswordPage'
import styles from './page.module.css'
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui'


export default function Home() {
  const [] = useState(false)

  const handleCorrectPassword = () => {
    
  }

  return (
        <WalletModalProvider>
          <main className={styles.main}>
            <CRTEffect>
                <PasswordPage onCorrectPassword={handleCorrectPassword} />
            </CRTEffect>
          </main>
        </WalletModalProvider>
  )
}

