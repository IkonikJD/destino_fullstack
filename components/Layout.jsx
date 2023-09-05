import React from 'react'
import { Header } from './'

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <div className='mt-20'>{children}</div>
    </>
  )
}

export default Layout
