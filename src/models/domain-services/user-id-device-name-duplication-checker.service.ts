import { IUserIdDeviceNameDuplicationChecker } from './contracts/user-id-device-name-duplication-checker.interface';
import {
  ITokenProvider,
  TOKEN_DATABASE_PROVIDER,
} from '../../persistance/postgress/providers/token-provider.interface';
import { Inject, Injectable, Scope } from '@nestjs/common';

@Injectable()
export class UserIdDeviceNameDuplicationChecker
  implements IUserIdDeviceNameDuplicationChecker
{
  constructor(
    @Inject(TOKEN_DATABASE_PROVIDER)
    private readonly tokenProvider: ITokenProvider,
  ) {}

  async isDuplicate(userId: number, deviceName: string): Promise<boolean> {
    return this.tokenProvider.isDuplicate(userId, deviceName);
  }
}
