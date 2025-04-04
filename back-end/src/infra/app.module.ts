import { Module } from '@nestjs/common';
import { EnvModule } from './env/env.module';
import { ConfigModule } from '@nestjs/config';
import { envSchema } from './env/env';
import { PessoaHttpModule } from './http/pessoa/pessoa-http.module';
import { RouterModule } from '@nestjs/core';
import { UsuarioHttpModule } from './http/usuario/pessoa-http.module';
import { BankAccountHttpModule } from './http/bank-account/bank-account-http.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    EnvModule,
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
  ],
})
export class AppModule {}
