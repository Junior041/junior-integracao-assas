import { defineEventHandler, readBody, getHeader, createError } from 'h3'
import axios from 'axios'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()

  const authHeader = getHeader(event, 'authorization')

  if (!authHeader) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Não autorizado: token ausente',
    })
  }

  try {
    const body = await readBody(event)

    const response = await axios.post(`${config.public.apiUrl}/pessoa`, body, {
      headers: {
        Authorization: authHeader.startsWith('Bearer ')
          ? authHeader
          : `Bearer ${authHeader}`,
      }
    })

    return response.data
  } catch (error: any) {
    console.error('Erro ao cadastrar pessoa:', error?.response?.data || error.message)
    throw createError({
      statusCode: 500,
      statusMessage: 'Erro ao cadastrar pessoa'
    })
  }
})
