import { Module } from '@nestjs/common';
import { CreateUsuarioController } from './controllers/create-usuario.controller';
import { CreateUsuarioUseCase } from '@/domain/application/cases/usuario/create-usuario-use-case';
import { DatabaseModule } from '@/infra/database/database.module';
import { CryptographyModule } from '@/infra/cryptography/cryptography.module';

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [CreateUsuarioController],
  providers: [CreateUsuarioUseCase],
})
export class UsuarioHttpModule {}
