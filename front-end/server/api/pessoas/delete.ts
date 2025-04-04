import { defineEventHandler, getQuery } from 'h3'
import axios from 'axios'

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event)
    const { idPessoa } = query

    if (!idPessoa) throw new Error('ID da pessoa não informado')

    const response = await axios.delete(`http://localhost:3333/pessoa/${idPessoa}`)
    return response.data
  } catch (error) {
    console.error('Erro ao excluir pessoa:', error)
    throw new Error('Erro ao excluir pessoa')
  }
})
