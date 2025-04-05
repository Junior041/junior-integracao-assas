import { Module } from '@nestjs/common';
import { CreateUsuarioController } from './controllers/create-usuario.controller';
import { CreateUsuarioUseCase } from '@/domain/application/cases/usuario/create-usuario-use-case';
import { DatabaseModule } from '@/infra/database/database.module';
import { CryptographyModule } from '@/infra/cryptography/cryptography.module';
import { LoginController } from './controllers/login.controller';
import { LoginUseCase } from '@/domain/application/cases/usuario/login-use-case';

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [CreateUsuarioController, LoginController],
  providers: [CreateUsuarioUseCase, LoginUseCase],
})
export class UsuarioHttpModule {}
