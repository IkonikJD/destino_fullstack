import React, { useRef, useState, useEffect } from 'react'

import { submitComment } from '../services'

const CommentsForm = ({ slug }) => {
  const [error, setError] = useState(false)
  const [showSuccessMessage, setshowSuccessMessage] = useState(false)
  const commentEl = useRef()
  const nameEl = useRef()
  const emailEl = useRef()
  const storeDataEl = useRef()

  useEffect(() => {
    nameEl.current.value = window.localStorage.getItem('name')
    emailEl.current.value = window.localStorage.getItem('email')
  }, [])

  const handleCommentSubmission = () => {
    setError(false)

    const { value: comment } = commentEl.current
    const { value: name } = nameEl.current
    const { value: email } = emailEl.current
    const { checked: storeData } = storeDataEl.current

    if (!comment || !name || !email) {
      setError(true)
      return
    }

    const commentObj = {
      name,
      email,
      comment,
      slug,
    }

    if (storeData) {
      window.localStorage.setItem('name', name)
      window.localStorage.setItem('email', email)
    } else {
      window.localStorage.removeItem('name', name)
      window.localStorage.removeItem('email', email)
    }

    submitComment(commentObj).then((res) => {
      setshowSuccessMessage(true)
      setTimeout(() => {
        setshowSuccessMessage(false)
      }, 3000)
    })
  }

  return (
    <div className='bg-white shadow-lg rounded-lg p-8 pb-12 mb-8'>
      <h3 className='text-xl mb-8 font-semibold border-bpb-4'>
        Escribe un comentario
      </h3>
      <div className='grid grid-cols-1 gap-4 mb-4'>
        <textarea
          ref={commentEl}
          className='p-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700'
          placeholder='Comentario...'
          name='comment'
        />
      </div>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4'>
        <input
          type='text'
          ref={nameEl}
          className='p-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700'
          placeholder='Nombre'
          name='name'
        />
        <input
          type='text'
          ref={emailEl}
          className='p-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700'
          placeholder='Email'
          name='email'
        />
      </div>
      <div className='grid grid-cols-1 gap-4 mb-4'>
        <div>
          <input
            ref={storeDataEl}
            type='checkbox'
            id='storeDate'
            name='storeData'
            value='true'
          />
          <label
            className='text-gray-500 cursor-pointer ml-2'
            htmlFor='storeData'
          >
            Guarda mi nombre y correo electrónico para la próxima vez que
            comente.
          </label>
        </div>
      </div>
      {error && (
        <p className='text-xs text-red-500'>
          Todos los campos son obligatorios.
        </p>
      )}
      <div className='mt-8'>
        <button
          type='button'
          onClick={handleCommentSubmission}
          className='transition duration-500 ease hover:bg-blue-900 inline-block bg-sky-500 text-lg rounded-full text-white px-4 py-1 cursor-pointer'
        >
          Enviar Comentario
        </button>
        {showSuccessMessage && (
          <span className='text-xl float-right font-semibold mt-3 text-green-500'>
            Comentario enviado con éxito
          </span>
        )}
      </div>
    </div>
  )
}

export default CommentsForm
