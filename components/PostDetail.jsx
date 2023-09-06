import React, { useState } from 'react'
import moment from 'moment/moment'
import 'moment/locale/es'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { dracula } from 'react-syntax-highlighter/dist/cjs/styles/prism'

const PostDetail = ({ post }) => {
  moment.locale('es')

  const [copied, setCopied] = useState({}) // Usamos un objeto para rastrear los estados de los code-blocks

  const getContentFragment = (index, text, obj, type) => {
    let modifiedText = text

    if (obj) {
      if (obj.bold) {
        modifiedText = <b key={index}>{text}</b>
      }

      if (obj.italic) {
        modifiedText = <em key={index}>{text}</em>
      }

      if (obj.underline) {
        modifiedText = <u key={index}>{text}</u>
      }
    }

    switch (type) {
      case 'heading-three':
        return (
          <h3 key={index} className='text-xl font-semibold mb-4'>
            {modifiedText.map((item, i) => (
              <React.Fragment key={i}>{item}</React.Fragment>
            ))}
          </h3>
        )
      case 'paragraph':
        return (
          <p key={index} className='mb-8'>
            {modifiedText.map((item, i) => (
              <React.Fragment key={i}>{item}</React.Fragment>
            ))}
          </p>
        )
      case 'heading-four':
        return (
          <h4 key={index} className='text-md font-semibold mb-4'>
            {modifiedText.map((item, i) => (
              <React.Fragment key={i}>{item}</React.Fragment>
            ))}
          </h4>
        )
      case 'block-quote':
        return (
          <blockquote
            key={index}
            className='border-l-4 border-slate-400 pl-4 py-2 font-medium text-black bg-yellow-100'
          >
            {modifiedText.map((item, i) => (
              <React.Fragment key={i}>{item}</React.Fragment>
            ))}
          </blockquote>
        )
      case 'image':
        return (
          <img
            key={index}
            alt={obj.title}
            height={obj.height}
            width={obj.width}
            src={obj.src}
          />
        )
      case 'code-block':
        // Convertimos el contenido del code-block a una cadena de texto
        const codeText = text.toString()

        // Extraemos la primera palabra del texto del código usando una expresión regular
        const firstWord = codeText.match(/\b(\w+)\b/)?.[0]

        // Eliminamos la primera palabra del texto para mostrar el resto del contenido debajo
        const contentWithoutFirstWord = codeText.replace(/^\w+\b/, '')

        const language = firstWord || 'html' // Si no se proporciona el lenguaje, utilizamos "html" por defecto

        return (
          <div key={index} className='mb-8' id={`code-${index}`}>
            {firstWord && (
              <div
                className='text-xl font-bold uppercase text-gray-600'
                style={{ fontFamily: 'monospace' }}
              >
                {firstWord}
              </div>
            )}
            <div
              key={index}
              className='relative rounded-lg overflow-x-auto whitespace-pre'
              style={{ borderRadius: '8px' }}
            >
              {/* Cambiamos el contenido del botón "Seleccionar Todo" para que dependa del estado del code-block */}
              {copied[index] ? (
                <div className='absolute right-2 p-2 bg-green-500 text-white rounded'>
                  Copiado!
                </div>
              ) : (
                <button
                  className='absolute right-2 p-2 bg-blue-500 text-white rounded hover:bg-blue-600'
                  onClick={() => {
                    const codeElement = document
                      .getElementById(`code-${index}`)
                      .getElementsByTagName('code')[0]
                    const codeText = codeElement.textContent

                    navigator.clipboard
                      .writeText(codeText)
                      .then(() => {
                        // Actualizamos el estado para mostrar el indicador visual
                        setCopied((prevCopied) => ({
                          ...prevCopied,
                          [index]: true,
                        }))
                        setTimeout(() => {
                          // Después de 2 segundos, ocultamos el indicador
                          setCopied((prevCopied) => ({
                            ...prevCopied,
                            [index]: false,
                          }))
                        }, 2000)
                      })
                      .catch((err) => {
                        console.error('No se pudo copiar al portapapeles', err)
                      })
                  }}
                >
                  Seleccionar Todo
                </button>
              )}
              {/* Utilizamos el componente SyntaxHighlighter para agregar el resaltado de sintaxis */}

              <SyntaxHighlighter language={language} style={dracula}>
                {contentWithoutFirstWord}
              </SyntaxHighlighter>
            </div>
          </div>
        )
      default:
        return modifiedText
    }
  }

  return (
    <div className='bg-white shadow-lg rounded-lg lg:p-8 pb-12 mb-8'>
      <div className='relative overflow-hidden shadow-md mb-6 h-100'>
        <img
          src={post.featuredImage.url}
          alt={post.title}
          className='object-cover h-full w-full shadow-lg rounded-t-lg lg:rounded-lg'
        />
      </div>
      <div className='px-4 lg:px-0'>
        <div className='flex items-center justify-between mb-8 w-full'>
          <div className='flex items-center mb-0 lg:mb-0'>
            <img
              alt={post.author.name}
              height='35px'
              width='35px'
              className='align-middle rounded-full'
              src={post.author.photo.url}
            />
            <p className='align-middle text-gray-700 ml-2 mr-2 text-lg'>
              {post.author.name}
            </p>
          </div>
          <div className='font-medium text-gray-700'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-6 w-6 inline mr-2 text-red-400'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
              />
            </svg>
            <span className='align-middle capitalize'>
              {moment(post.createdAt).format('DD / MMMM / YYYY')}
            </span>
          </div>
        </div>
        <h1 className='mb-8 text-3xl font-semibold'>{post.title}</h1>
        {post.content.raw.children.map((typeObj, index) => {
          const children = typeObj.children.map((item, itemIndex) =>
            getContentFragment(itemIndex, item.text, item)
          )

          return getContentFragment(index, children, typeObj, typeObj.type)
        })}
      </div>
    </div>
  )
}

export default PostDetail
