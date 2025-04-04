import { defineEventHandler, readBody } from 'h3'
import axios from 'axios'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const { idPessoa, ...resto } = body
    
    const response = await axios.put(`http://localhost:3333/pessoa/${idPessoa}`, resto)
    return response.data
  } catch (error) {
    console.error('Erro ao atualizar pessoa:', error)
    throw new Error('Erro ao atualizar pessoa')
  }
})
