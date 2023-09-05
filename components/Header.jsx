import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import NavLinks from './NavLinks'
import Search from './Search'
import Social from './Social'

const Header = () => {
  const [open, setOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  }, [open])

  useEffect(() => {
    const handleRouteChange = () => {
      setOpen(false)
    }

    router.events.on('routeChangeComplete', handleRouteChange)

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router])

  const closeMenu = () => {
    setOpen(false)
  }

  const toggleMenu = () => {
    setOpen(!open)
  }

  return (
    <nav className='bg-white mb-8 fixed inset-x-0 top-0 z-50'>
      <div className='flex items-center justify-between px-5 py-3 md:px-10'>
        <Link href='/'>
          <div className='cursor-pointer flex items-center'>
            <img
              src='/logo2.png' // Reemplaza 'ruta-de-tu-imagen.png' con la ruta de tu imagen de logo
              alt='Logo de Destino FullStack'
              className='h-10 md:h-10' // Establece la altura deseada para el logo en diferentes tamaños de pantalla
            />
          </div>
        </Link>
        <div
          className='cursor-pointer text-3xl p-2 md:hidden'
          onClick={toggleMenu}
        >
          <ion-icon name={`${open ? 'close' : 'menu'}`}></ion-icon>
        </div>
        <ul className='hidden md:flex uppercase items-center gap-4 font-semibold'>
          <NavLinks closeMenu={closeMenu} />
        </ul>
        <div className='hidden md:flex items-center mr-4'>
          <Social />
          <Search />
        </div>
      </div>

      {/* Mobile Nav */}
      <div
        className={`
            md:hidden bg-white fixed mt-15 inset-0 z-40 transition-transform duration-500 
            ${open ? 'transform translate-x-0' : 'transform -translate-x-full'}
        `}
      >
        <ul className='w-full h-full py-10 pl-4 overflow-y-hidden uppercase font-semibold'>
          <NavLinks closeMenu={closeMenu} />
          <div className='py-5 text-center'>
            <div className='mb-4 flex justify-center'>
              <Social />
            </div>
            <Search />
          </div>
        </ul>
      </div>
    </nav>
  )
}

export default Header
