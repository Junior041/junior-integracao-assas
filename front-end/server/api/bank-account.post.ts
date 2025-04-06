/* eslint-disable @typescript-eslint/no-explicit-any */
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

    const response = await axios.post(`${config.public.apiUrl}/bank-account`, body, {
      headers: {
        Authorization: authHeader,
      }
    })

    return response.data
  } catch (error: any) {
    console.error('Erro ao cadastrar conta bancária:', error?.response?.data || error.message)
    throw createError({
      statusCode: 500,
      statusMessage: 'Erro ao cadastrar conta bancária'
    })
  }
})
