import {
  Encrypter,
  EncryptSignOptions,
} from '@/domain/application/cryptography/encrypter';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class JwtEncrypter implements Encrypter {
  constructor(private jwtService: JwtService) {}

  encrypt(
    payload: Record<string, unknown>,
    options?: EncryptSignOptions,
  ): Promise<string> {
    return this.jwtService.signAsync(payload, {
      expiresIn: options?.expiresIn || '1d',
    });
  }
}
