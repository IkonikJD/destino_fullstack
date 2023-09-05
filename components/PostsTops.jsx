import React, { useState, useEffect } from 'react'
import moment from 'moment/moment'
import 'moment/locale/es'
import Link from 'next/link'

import { getPopularPosts } from '../services'

const PostsTops = () => {
  const [relatedPosts, setRelatedPosts] = useState([])

  useEffect(() => {
    getPopularPosts().then((newPost) => setRelatedPosts(newPost))
  }, [])

  moment.locale('es')

  return (
    <div className='bg-white shadow-lg rounded-lg p-8 mb-8'>
      <h3 className='text-xl mb-8 font-semibold border-b pb-4'>
        Artículos Populares
      </h3>
      {relatedPosts.map((post) => (
        <div key={post.title} className='flex items-center w-full mb-4'>
          <div className='w-16 flex-none'>
            <img
              alt={post.title}
              height='60px'
              width='60px'
              className='align-middle rounded-full'
              src={post.featuredImage.url}
            />
          </div>
          <div className='flex-grow ml-4'>
            <p className='capitalize text-gray-500 text-xs'>
              {moment(post.createdAt).format('DD / MMMM / YYYY')}
            </p>
            <Link
              href={`/post/${post.slug}`}
              key={post.title}
              className='text-md font-semibold hover:text-sky-500'
            >
              {post.title}
            </Link>
          </div>
        </div>
      ))}
    </div>
  )
}

export default PostsTops