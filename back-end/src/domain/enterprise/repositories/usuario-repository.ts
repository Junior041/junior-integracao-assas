import { Usuario } from '../entities/usuario-entity';

export abstract class UsuarioRepository {
  abstract findById(idUsuario: string): Promise<Usuario | null>;
  abstract findByFkPessoa(fkPessoa: string): Promise<Usuario | null>;
  abstract findByEmail(email: string): Promise<Usuario | null>;
  abstract create(data: Usuario): Promise<Usuario>;
  abstract delete(idUsuario: string): Promise<void>;
}
