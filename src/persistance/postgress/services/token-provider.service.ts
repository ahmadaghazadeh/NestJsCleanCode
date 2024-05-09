import { TokenEntity } from '../entites/token.entity';
import { ITokenProvider } from '../providers/token-provider.interface';
import { Injectable, Scope } from '@nestjs/common';
import { UnitOfWork } from '../../../framework/persistance/unit-of-work.service';

@Injectable({ scope: Scope.REQUEST })
export class TokenProviderService implements ITokenProvider {
  constructor(private readonly uow: UnitOfWork) {} //
  isVerifyToken(tokenEntity: TokenEntity): Promise<boolean> {
    throw new Error('Method not implemented.');
  }

  login(tokenEntity: TokenEntity): Promise<TokenEntity> {
    const token = this.uow.getManager().create(TokenEntity, tokenEntity);
    return this.uow.getManager().save(token);
  }

  async isDuplicate(userId: number, deviceName: string): Promise<boolean> {
    return await this.uow
      .getManager()
      .createQueryBuilder(TokenEntity, 't')
      .where('t.user_id = :userId', {
        userId: userId,
      })
      .andWhere('t.device_model = :deviceModel', {
        deviceModel: deviceName,
      })
      .getExists();
  }
}
