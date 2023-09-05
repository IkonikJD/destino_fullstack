import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { getSearch } from '../services'
import { PostCard, PostWidget, PostsTops, Categories } from '../components'

const SearchResults = () => {
  const router = useRouter()
  const { term } = router.query
  const [searchResults, setSearchResults] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      if (term) {
        const results = await getSearch(term)
        setSearchResults(results)
      }
    }

    fetchData()
  }, [term])

  return (
    <div className='container mx-auto px-10 mb-8 mt-28'>
      <div className='grid grid-cols-1 lg:grid-cols-12 gap-12'>
        <div className='col-span-1 lg:col-span-8'>
          <div className='bg-white shadow-lg rounded-lg p-0 lg:p-8 pb-12 mb-8'>
            <h2 className='text-2xl mb-4'>
              Resultados de búsqueda para "{term}":
            </h2>
            {searchResults.length > 0 ? (
              searchResults.map((result) => (
                <div key={result.id}>
                  <PostCard post={result} />
                </div>
              ))
            ) : (
              <p>No se encontraron resultados para "{term}".</p>
            )}
          </div>
        </div>
        <div className='col-span-1 lg:col-span-4'>
          <div className='relative lg:sticky lg:top-28'>
            <PostWidget />
            <PostsTops />
            <Categories />
          </div>
        </div>
      </div>
    </div>
  )
}

export default SearchResults
