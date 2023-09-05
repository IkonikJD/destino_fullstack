import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { links } from './MyLinks'
import { useRouter } from 'next/router'

const NavLinks = () => {
  const [heading, setHeading] = useState('')

  const router = useRouter()

  useEffect(() => {
    const handleRouteChange = () => {
      setHeading('')
    }

    router.events.on('routeChangeComplete', handleRouteChange)

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router])

  return (
    <>
      {links.map((link, index) => (
        <div key={index}>
          <div className='px-3 text-left cursor-pointer'>
            <h1
              className='py-2 flex justify-between items-center md:pr-0 pr-5'
              onClick={() =>
                heading !== link.name ? setHeading(link.name) : setHeading('')
              }
            >
              {link.link ? (
                <Link href={link.link} className='hover:text-sky-500'>
                  {link.name}
                </Link>
              ) : (
                <>
                  {link.name}
                  <span className='text-xl md:mt-1 md:ml-2 inline'>
                    <ion-icon
                      name={`${
                        heading === link.name ? 'chevron-up' : 'chevron-down'
                      }`}
                    ></ion-icon>
                  </span>
                </>
              )}
            </h1>
            {link.submenu && (
              <div
                className={`absolute top-14 hidden shadow-2xl rounded-b
              ${heading === link.name ? 'hidden md:block' : 'block'}`}
              >
                <div className='py-3'>
                  <div className='w-4 h-4 left-3 absolute mt-1 bg-white rotate-45'></div>
                </div>
                <div className='bg-white p-5 grid grid-cols-2 gap-20'>
                  {link.sublinks.map((mysublinks, subIndex) => (
                    <div key={subIndex}>
                      <h1 className='text-lg font-semibold'>
                        {mysublinks.Head}
                      </h1>
                      {mysublinks.sublink.map((slink, slinkIndex) => (
                        <li
                          key={slinkIndex}
                          className='text-sm text-gray-600 pl-2 my-2.5 normal-case'
                        >
                          <Link
                            href={slink.link}
                            className='hover:text-sky-500'
                          >
                            {slink.name}
                          </Link>
                        </li>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          {/* Mobile Menu */}
          <div
            className={`
          ${heading === link.name ? 'md:hidden' : 'hidden'}
          `}
          >
            {/* sublinks */}
            {link.submenu && (
              <div>
                <div>
                  {link.sublinks.map((mysublinks, subIndex) => (
                    <div key={subIndex}>
                      <h1 className='py-4 pl-7 font-semibold md:pr-0 pr-5'>
                        {mysublinks.Head}
                      </h1>
                      <div>
                        {mysublinks.sublink.map((slink, slinkIndex) => (
                          <li
                            key={slinkIndex}
                            className='py-3 pl-14 capitalize text-gray-600'
                          >
                            <Link href={slink.link}>{slink.name}</Link>
                          </li>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
    </>
  )
}

export default NavLinks
