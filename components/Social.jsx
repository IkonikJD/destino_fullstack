import Link from 'next/link'
import React from 'react'

const Social = () => {
  return (
    <div className='flex gap-4 mr-4'>
      <Link
        href='https://www.linkedin.com/in/jdavidprietosuarez/'
        target='_blank'
        rel='noopener noreferrer'
        title='Linkedin'
        className='hover:text-sky-500 transform hover:scale-110'
      >
        <ion-icon name='logo-linkedin' style={{ fontSize: '2rem' }}></ion-icon>
      </Link>
      <Link
        href='https://josedavidps.netlify.app/'
        target='_blank'
        rel='noopener noreferrer'
        title='PortFolio Personal'
        className='hover:text-sky-500 transform hover:scale-110'
      >
        <ion-icon name='globe-outline' style={{ fontSize: '2rem' }}></ion-icon>
      </Link>
      <Link
        href='https://github.com/IkonikJD'
        target='_blank'
        rel='noopener noreferrer'
        title='Github'
        className='hover:text-sky-500 transform hover:scale-110'
      >
        <ion-icon name='logo-github' style={{ fontSize: '2rem' }}></ion-icon>
      </Link>
    </div>
  )
}

export default Social
