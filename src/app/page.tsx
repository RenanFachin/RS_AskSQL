import Image from 'next/image'
import logoImage from '../assets/logo.svg'

import { Trash2, Stars } from 'lucide-react'

export default function Home() {
  return (
    <div className='max-w-[430px] mx-auto px-4 pt-12 pb-4'>
      {/* Logo + delete button */}
      <header className='flex items-center justify-between'>
        <Image src={logoImage} width={118} height={27} alt='' />

        <button type='button'>
          <Trash2 className='h-8 w-8 text-snow' strokeWidth={0.6} />
        </button>
      </header>

      {/* Pergunta para ai */}
      <form className='py-8 w-full flex flex-col text-foam'>
        <label
          htmlFor="schema"
          className='text-lg font-light'
        >
          Cole seu código SQL aqui:
        </label>
        <textarea
          className='my-4 bg-blueberry-600 border border-blueberry-300 rounded-md px-4 py-3 outline-none focus:ring-2 focus:ring-pistachio' name="schema"
          id="schema"
        />

        <label
          htmlFor="question"
          className='text-lg font-light'
        >
          Faça uma pergunta sobre o código:
        </label>
        <textarea
          className='my-4 bg-blueberry-600 border border-blueberry-300 rounded-md px-4 py-3 outline-none focus:ring-2 focus:ring-pistachio' name="question"
          id="question"
        />

        <button
          type="submit"
          className='text-pistachio flex items-center justify-center rounded-xl border border-pistachio h-14 gap-3'
        >
          <Stars className='w-6 h-6 ' />
          Perguntar à inteligência artificial
        </button>
      </form>

      {/* resposta da ai */}
      <div className='mt-6'>
        <span className='text-lg font-light text-snow'>Sua resposta:</span>
        <textarea
          readOnly
          className='w-full my-4 bg-transparent border border-blueberry-300 rounded-md px-4 py-3 outline-none focus:ring-2 focus:ring-lime-700'
        />
      </div>
    </div>
  )
}
