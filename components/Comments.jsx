import React, { useState, useEffect } from 'react'
import moment from 'moment/moment'
import 'moment/locale/es'
import parse from 'html-react-parser'
import { getComments } from '../services'
import { comment } from 'postcss'

const Comments = ({ slug }) => {
  const [comments, setComments] = useState([])

  useEffect(() => {
    getComments(slug).then((result) => setComments(result))
  }, [])

  moment.locale('es')

  const formatMonth = (date) => {
    const monthName = moment(date).format('MMMM')
    return (
      monthName.charAt(0).toUpperCase() + monthName.slice(1).toLocaleLowerCase()
    )
  }

  return (
    <>
      {comment.length > 0 && (
        <div className='bg-white shadow-lg rounded-lg p-8 pb-12 mb-8'>
          <h3 className='text-xl mb-8 font-semibold border-b pb-4'>
            {comments.length} Comentarios
          </h3>
          {comments.map((comment) => (
            <div
              key={comment.createdAt}
              className='border-b border-gray-100 mb-4 pb-4'
            >
              <p className='mb-4'>
                <span className='font-semibold capitalize'>{comment.name}</span>{' '}
                el{' '}
                {moment(comment.createdAt).format('DD [de] ') +
                  formatMonth(comment.createdAt) +
                  moment(comment.createdAt).format(
                    ' [de] YYYY [a las] HH:mm:ss'
                  )}
              </p>
              <p className='whitespace-pre-line text-gray-600 w-full capitalize'>
                {parse(comment.comment)}
              </p>
            </div>
          ))}
        </div>
      )}
    </>
  )
}

export default Comments
