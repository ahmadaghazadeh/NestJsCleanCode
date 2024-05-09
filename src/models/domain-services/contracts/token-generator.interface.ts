export interface ITokenGenerator {
  generateToken(payload: any): Promise<string>;
}

export const ITokenGenerator = 'ITokenGenerator';
