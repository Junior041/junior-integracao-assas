import { Either, left, right } from '@/core/either';
import { UsuarioRepository } from '@/domain/enterprise/repositories/usuario-repository';
import { CredenciaisInvalidasError } from '@/core/errors/errors/credenciais-invalidas-error';
import { HashComparer } from '../../cryptography/hasher-comparer';
import { Encrypter } from '../../cryptography/encrypter';
import { Injectable } from '@nestjs/common';

interface LoginUseCaseRequest {
  email: string;
  senha: string;
}

type LoginUseCaseResponse = Either<
  CredenciaisInvalidasError,
  {
    accessToken: string;
  }
>;
@Injectable()
export class LoginUseCase {
  constructor(
    private usuarioRepository: UsuarioRepository,
    private hashComparer: HashComparer,
    private encrypter: Encrypter,
  ) {}

  async execute({
    email,
    senha,
  }: LoginUseCaseRequest): Promise<LoginUseCaseResponse> {
    const usuario = await this.usuarioRepository.findByEmail(email);
    if (!usuario) {
      return left(new CredenciaisInvalidasError());
    }
    const senhaValida = await this.hashComparer.compare(senha, usuario.senha);
    if (!senhaValida) {
      return left(new CredenciaisInvalidasError());
    }
    console.log(senhaValida);

    const accessToken = await this.encrypter.encrypt({
      sub: usuario.id.toString(),
    });
    return right({
      accessToken,
    });
  }
}
