import { ITokenGenerator } from './contracts/token-generator.interface';
import { JwtService } from '@nestjs/jwt';
import { Injectable, Scope } from '@nestjs/common';

@Injectable()
export class TokenGenerator implements ITokenGenerator {
  constructor(private readonly jwtService: JwtService) {}

  async generateToken(payload: any): Promise<string> {
    return this.jwtService.signAsync(payload);
  }
}
