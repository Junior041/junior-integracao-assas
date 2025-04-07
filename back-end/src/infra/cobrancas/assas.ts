import { Injectable } from '@nestjs/common';
import { EnvService } from '../env/env.service';
import axios from 'axios';
import {
  CreateAccountBody,
  CreateAccountResponse,
  IntegracaoCobrancas,
} from '@/domain/application/integracoes/cobrancas/integracao-cobrancas';

@Injectable()
export class Assas implements IntegracaoCobrancas {
  private readonly baseUrl = 'https://api-sandbox.asaas.com/v3/accounts';
  private readonly accessToken: string;

  constructor(private env: EnvService) {
    this.accessToken = this.env.get('TOKEN_ASSAS');
  }

  async createAccount(
    body: CreateAccountBody,
  ): Promise<CreateAccountResponse | { errors: any[] } | null> {
    try {
      const response = await axios.post<CreateAccountResponse>(
        this.baseUrl,
        {
          name: body.name,
          email: body.email,
          cpfCnpj: body.cpfCnpj,
          mobilePhone: body.mobilePhone,
          incomeValue: body.incomeValue,
          address: body.address,
          addressNumber: body.addressNumber ?? '',
          province: body.province,
          postalCode: body.postalCode,
          birthDate: body.birthDate.toISOString().split('T')[0], // yyyy-mm-dd
        },
        {
          headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            access_token: this.accessToken,
          },
        },
      );

      return response.data;
    } catch (error: any) {
      console.error('Erro Assas:', error.response?.data);

      // Se o erro contiver `errors`, retorne diretamente
      if (error.response?.data?.errors) {
        return { errors: error.response.data.errors };
      }

      // Senão, retorna o conteúdo genérico
      return {
        errors: [
          {
            code: 'unknown_error',
            description: 'Erro desconhecido ao criar conta',
          },
        ],
      };
    }
  }
}
