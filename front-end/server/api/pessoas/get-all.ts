import { defineEventHandler, parseCookies } from 'h3'
import axios from 'axios'

interface Pessoa {
  idPessoa: string
  nome: string
  cpfCnpj: string
  createdAt: string
}

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const cookies = parseCookies(event)
  const authToken = cookies.auth_token

  try {
    const { data } = await axios.get<{ pessoas: Pessoa[] }>(
      `${config.public.apiUrl}/pessoa/get-all?order=asc`,
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    )

    return data.pessoas
  } catch (error) {
    console.error('Erro ao buscar pessoas:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Erro ao buscar pessoas',
    })
  }
})
