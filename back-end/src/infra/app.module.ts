import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { envSchema } from './env/env';
import { PessoaHttpModule } from './http/pessoa/pessoa-http.module';
import { RouterModule } from '@nestjs/core';
import { UsuarioHttpModule } from './http/usuario/usuario-http.module';
import { BankAccountHttpModule } from './http/bank-account/bank-account-http.module';
import { BullModule } from '@nestjs/bull';
import { EnderecoHttpModule } from './http/enderecos/endereco-http.module';
import { AuthModule } from './http/auth/auth.module';
import { GraficosHttpModule } from './http/graficos/graficos-httm.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    AuthModule,
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    PessoaHttpModule,
    RouterModule.register([
      {
        path: '/pessoa',
        module: PessoaHttpModule,
      },
    ]),
    UsuarioHttpModule,
    RouterModule.register([
      {
        path: '/usuario',
        module: UsuarioHttpModule,
      },
    ]),
    BankAccountHttpModule,
    RouterModule.register([
      {
        path: '/bank-acocunt',
        module: BankAccountHttpModule,
      },
    ]),
    EnderecoHttpModule,
    RouterModule.register([
      {
        path: '/endereco',
        module: EnderecoHttpModule,
      },
    ]),
    GraficosHttpModule,
    RouterModule.register([
      {
        path: '/graficos',
        module: GraficosHttpModule,
      },
    ]),
  ],
})
export class AppModule {}
