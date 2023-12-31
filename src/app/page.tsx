'use client'
import { useState } from 'react';
import Image from 'next/image'
import logoImage from '../assets/logo.svg'

import { Trash2, Stars } from 'lucide-react'

// lib para syntax highlight
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs';
import 'prismjs/components/prism-sql';
import 'prismjs/themes/prism-funky.css'; //Example style, you can use another

// AI
import { useCompletion } from 'ai/react'


export default function Home() {

  // funções do tipo useState são client side, precisa adicionar 'use client' ou criar um componente
  const [schema, setSchema] = useState('')


  // AI
  // o usechat funciona como um chat, vai e volta respostas
  // o useCompletion funciona para receber uma resposta para um prompt
  const { completion, handleSubmit, input, handleInputChange } = useCompletion({
    api: '/api/generate-sql',
    body: {
      schema
    },

  })

  const result = completion

  function handleCleanPromptInputs() {
    setSchema('')
  }


  // console.log(result)

  return (
    <div className='max-w-[430px] mx-auto px-4 pt-12 pb-4'>
      {/* Logo + delete button */}
      <header className='flex items-center justify-between'>
        <Image src={logoImage} width={118} height={27} alt='' />

        <button type='button' onClick={handleCleanPromptInputs}>
          <Trash2
            className='h-8 w-8 text-snow hover:text-gum-600'
            strokeWidth={0.6}
          />
        </button>
      </header>

      {/* Pergunta para ai */}
      <form
        onSubmit={handleSubmit}
        className='py-8 w-full flex flex-col text-foam'
      >
        <label
          htmlFor="schema"
          className='text-lg font-light'
        >
          Cole seu código SQL aqui:
        </label>

        <Editor
          textareaId='schema'
          value={schema}
          onValueChange={schema => setSchema(schema)}
          highlight={schema => highlight(schema, languages.sql, 'sql')}
          // Não estava aceitando o padding no className com tailwindcss
          padding={16}
          textareaClassName='outline-none'
          // focus-within pq o elemento vai apresentar o focus quando o elemento pai for focado tbm
          className='my-4 font-mono h-40 bg-blueberry-600 border border-blueberry-300 rounded-md focus-within:ring-2 focus-within:ring-pistachio'
        />


        <label
          htmlFor="question"
          className='text-lg font-light'
        >
          Faça uma pergunta sobre o código:
        </label>
        <textarea
          className='my-4 bg-blueberry-600 border border-blueberry-300 rounded-md px-4 py-3 outline-none focus:ring-2 focus:ring-pistachio'
          name="question"
          id="question"
          value={input}
          onChange={handleInputChange}
        />


        <button
          type="submit"
          className='text-pistachio flex items-center justify-center rounded-xl border border-pistachio h-14 gap-3 hover:bg-blueberry-600 hover:text-snow hover:border-snow'
        >
          <Stars className='w-6 h-6' />
          Perguntar à inteligência artificial
        </button>
      </form>

      {/* resposta da ai */}
      <div className='mt-6'>
        <span className='text-lg font-light text-snow'>Sua resposta:</span>

        <Editor
          textareaId='schema'
          readOnly
          value={result}
          onValueChange={() => { }} // Como é um parâmetro obrigatório, estamos deixando uma função sem "nada"
          highlight={code => highlight(code, languages.sql, 'sql')}
          // Não estava aceitando o padding no className com tailwindcss
          padding={16}
          textareaClassName='outline-none'
          // focus-within pq o elemento vai apresentar o focus quando o elemento pai for focado tbm
          className='w-full my-4 bg-transparent border border-blueberry-300 rounded-md'
        />
      </div>
    </div>
  )
}
