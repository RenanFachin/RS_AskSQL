import Image from 'next/image'
import logoImage from '../assets/logo.svg'

import { Trash2, Stars } from 'lucide-react'

export default function Home() {
  return (
    <div className='max-w-[430px] mx-auto pt-12 pb-4'>
      {/* Logo + delete button */}
      <header className='flex items-center justify-between'>
        <Image src={logoImage} width={118} height={27} alt='' />

        <button type='button'>
          <Trash2 className='h-8 w-8 text-snow' strokeWidth={0.6} />
        </button>
      </header>

      {/* Pergunta para ai */}
      <form action="">
        <label htmlFor="schema">Cole seu código SQL aqui:</label>
        <textarea name="schema" id="schema" />

        <label htmlFor="question">Faça uma pergunta sobre o código:</label>
        <textarea name="question" id="question" />

        <button type="submit" className='text-pistachio'>
          <Stars className='w-6 h-6 ' />
          Perguntar à inteligência artificial
        </button>
      </form>

      {/* resposta da ai */}
      <div>
        <span>Sua resposta: </span>
        <textarea />
      </div>
    </div>
  )
}
