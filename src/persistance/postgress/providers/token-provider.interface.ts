import { TokenEntity } from '../entites/token.entity';

export interface ITokenWriter {
  login(tokenEntity: TokenEntity): Promise<TokenEntity>;

  isDuplicate(userId: number, deviceName: string): Promise<boolean>;
}

export interface ITokenReader {
  isVerifyToken(tokenEntity: TokenEntity): Promise<boolean>;
}

export interface ITokenProvider extends ITokenWriter, ITokenReader {}

export const TOKEN_DATABASE_PROVIDER = 'token-database-provider';
