import { defineEventHandler, getHeader } from 'h3'
import axios from 'axios'

interface Pessoa {
  idPessoa: string
  nome: string
  cpfCnpj: string
  createdAt: string
}

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()

  // Pegando o token enviado no header Authorization
  const authHeader = getHeader(event, 'authorization')

  if (!authHeader) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Não autorizado: token ausente',
    })
  }

  try {
    const { data } = await axios.get<{ pessoas: Pessoa[] }>(
      `${config.public.apiUrl}/pessoa/get-all?order=asc`,
      {
        headers: {
          Authorization: `Bearer ${authHeader}`,
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
