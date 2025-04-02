export type EncryptSignOptions = {
  expiresIn: string;
};
export abstract class Encrypter {
  abstract encrypt(
    payload: Record<string, unknown>,
    options?: EncryptSignOptions,
  ): Promise<string>;
}
