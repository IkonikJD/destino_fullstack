import React, { useEffect } from 'react'
import { Layout } from '../components'
import 'tailwindcss/tailwind.css'
import '../styles/globals.scss'

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    const ioniconsScript = document.createElement('script')
    ioniconsScript.src =
      'https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js'
    ioniconsScript.crossOrigin = 'anonymous'
    document.body.appendChild(ioniconsScript)

    return () => {
      document.body.removeChild(ioniconsScript)
    }
  }, [])

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp
