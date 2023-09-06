import React, { useEffect } from 'react'
import Head from 'next/head'
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
      <Head>
        <title>Destino FullStack</title>
        <meta
          name='description'
          content='Blog dedidado al aprendizaje y dominio del programador FullStack'
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp
