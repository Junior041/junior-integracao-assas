import { defineEventHandler } from 'h3'
import axios from 'axios'

interface Pessoa {
  idPessoa: string
  nome: string
  cpfCnpj: string
  createdAt: string
}

export default defineEventHandler(async () => {
  try {
    const { data } = await axios.get<{ pessoas: Pessoa[] }>('http://localhost:3333/pessoa/get-all?order=asc')
    return data.pessoas
  } catch (error) {
    console.error('Erro ao buscar pessoas:', error)
    throw new Error('Erro ao buscar pessoas')
  }
})
