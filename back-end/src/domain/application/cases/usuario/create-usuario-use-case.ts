import { Either, left, right } from '@/core/either';
import { JaCadastradroErro } from '@/core/errors/errors/ja-registrado-erro';
import { Usuario } from '@/domain/enterprise/entities/usuario-entity';
import { UsuarioRepository } from '@/domain/enterprise/repositories/usuario-repository';
import { HashGenerator } from '../../cryptography/hasher-generator';
import { PessoaRepository } from '@/domain/enterprise/repositories/pessoa-repository';
import { DadoNaoEncontradoErro } from '@/core/errors/errors/dado-nao-encontrado-erro';
import { Injectable } from '@nestjs/common';

interface CreateUsuarioUseCaseRequest {
  fkPessoa: string;
  email: string;
  senha: string;
  ativo: boolean;
}

type CreateUsuarioUseCaseResponse = Either<
  JaCadastradroErro,
  {
    usuario: Usuario;
  }
>;
@Injectable()
export class CreateUsuarioUseCase {
  constructor(
    private usuarioRepository: UsuarioRepository,
    private pessoaRepository: PessoaRepository,
    private hashGenerator: HashGenerator,
  ) {}

  async create({
    ativo,
    email,
    fkPessoa,
    senha,
  }: CreateUsuarioUseCaseRequest): Promise<CreateUsuarioUseCaseResponse> {
    let usuarioJaCadastrado =
      await this.usuarioRepository.findByFkPessoa(fkPessoa);
    if (usuarioJaCadastrado) {
      return left(new JaCadastradroErro());
    }
    usuarioJaCadastrado = await this.usuarioRepository.findByEmail(email);
    if (usuarioJaCadastrado) {
      return left(new JaCadastradroErro());
    }

    const pessoa = await this.pessoaRepository.findById(fkPessoa);
    if (!pessoa) {
      return left(
        new DadoNaoEncontradoErro({
          dado: 'fkPessoa',
          valor: fkPessoa,
        }),
      );
    }

    const senha_hash = await this.hashGenerator.hash(senha);
    const usuario = Usuario.create({
      ativo,
      email,
      fkPessoa,
      senha: senha_hash,
    });

    await this.usuarioRepository.create(usuario);
    return right({
      usuario,
    });
  }
}
