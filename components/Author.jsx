import React from 'react'
import Image from 'next/image'

const Author = ({ author }) => {
  return (
    <div className='text-center mx-auto mt-20 mb-8 p-12 relative rounded-lg bg-white bg-opacity-20'>
      <div className='absolute left-0 right-0 -top-12 flex justify-center'>
        <Image
          alt={author.name}
          unoptimized
          height={100}
          width={100}
          className='rounded-full'
          src={author.photo.url}
        />
      </div>
      <h3 className='text-white mt-4 mb-4 text-xl font-bold'>{author.name}</h3>
      <p className='text-white text-lg'>{author.description}</p>
    </div>
  )
}

export default Author
