import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

const Search = () => {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('')

  const handleSearch = () => {
    submitSearch()
  }

  const handleChange = (e) => {
    setSearchTerm(e.target.value)
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      submitSearch()
    }
  }

  const submitSearch = () => {
    router.push(`/search?term=${encodeURIComponent(searchTerm)}`)
  }

  useEffect(() => {
    const handleRouteChange = () => {
      setSearchTerm('')
    }

    router.events.on('routeChangeStart', handleRouteChange)

    return () => {
      router.events.off('routeChangeStart', handleRouteChange)
    }
  }, [])

  return (
    <div className='flex justify-center'>
      <div className='flex relative p-1 bg-gradient-to-tr from-purple-800 to-sky-600 rounded-full'>
        <input
          type='text'
          value={searchTerm}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          placeholder='Buscar...'
          className='flex p-1 pl-2 rounded-full focus:outline-none focus:ring-0'
        />
        <button
          onClick={handleSearch}
          className='px-2 text-white rounded-full focus:outline-none focus:ring-0'
        >
          <ion-icon
            name='search-outline'
            style={{ fontSize: '1.5rem' }}
            className='text-white'
          ></ion-icon>
        </button>
      </div>
    </div>
  )
}

export default Search
