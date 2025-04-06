import { defineEventHandler, readBody, parseCookies } from 'h3'
import axios from 'axios'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const cookies = parseCookies(event)
  const authToken = cookies.auth_token

  try {
    const body = await readBody(event)
    const response = await axios.post(`${config.public.apiUrl}/pessoa`, body, {
      headers: {
        Authorization: `Bearer ${authToken}`
      }
    })
    return response.data
  } catch (error) {
    console.error('Erro ao cadastrar pessoa:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Erro ao cadastrar pessoa'
    })
  }
})
