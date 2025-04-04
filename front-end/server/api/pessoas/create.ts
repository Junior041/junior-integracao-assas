import { defineEventHandler, readBody } from 'h3'
import axios from 'axios'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const response = await axios.post('http://localhost:3333/pessoa', body)
    return response.data
  } catch (error) {
    console.error('Erro ao cadastrar pessoa:', error)
    throw new Error('Erro ao cadastrar pessoa')
  }
})
