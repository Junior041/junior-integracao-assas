import { Usuario } from "../entities/usuario-entity";

export abstract class UsuarioRepository {
  abstract findByFkPessoa(fkPessoa: string): Promise<Usuario | null>;
  abstract findByEmail(email: string): Promise<Usuario | null>;
  abstract create(data: Usuario): Promise<Usuario>;
}
