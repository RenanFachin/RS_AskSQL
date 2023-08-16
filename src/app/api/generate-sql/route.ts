import { Configuration, OpenAIApi } from 'openai-edge'
import { OpenAIStream, StreamingTextResponse } from 'ai'

// Optional, but recommended: run on the edge runtime.
// See https://vercel.com/docs/concepts/functions/edge-functions
export const runtime = 'edge'

const apiConfig = new Configuration({
  apiKey: process.env.OPENAI_API_KEY!
})

const openai = new OpenAIApi(apiConfig)

export async function POST(req: Request) {
  // Extract the `messages` from the body of the request
  const { schema, prompt } = await req.json()


  // a const prompt é um "modelo" das perguntas, adicionando o que o usuário deseja saber com um texto padrão de pesquisa
  const message = `
    O seu trabalho é criar queries em SQL a partir de um schema SQL abaixo:

    Schema SQL:
    """
    ${schema}
    """

    A partir do schema acima, escreva uma query SQL a partir da solicitação abaixo:

    Solicitação: ${prompt}

    Me retorne somente o código SQL, nada além disso.
  `.trim()

  // Request the OpenAI API for the response based on the prompt
  const response = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    stream: true,
    messages: [
      {
        role: 'user',
        content: message
      }
    ]
  })

  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response)

  // Respond with the stream
  return new StreamingTextResponse(stream)
}