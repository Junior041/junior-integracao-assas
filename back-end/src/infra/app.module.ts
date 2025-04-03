import { Module } from '@nestjs/common';
import { EnvModule } from './env/env.module';
import { ConfigModule } from '@nestjs/config';
import { envSchema } from './env/env';
import { PessoaHttpModule } from './http/pessoa/pessoa-http.module';
import { RouterModule } from '@nestjs/core';

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
  ],
})
export class AppModule {}
