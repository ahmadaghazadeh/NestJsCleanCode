import { Inject, Injectable, Scope } from '@nestjs/common';
import {
  ITokenProvider,
  TOKEN_DATABASE_PROVIDER,
} from '../persistance/postgress/providers/token-provider.interface';
import { ITokenGenerator } from './domain-services/contracts/token-generator.interface';
import { IUserIdDeviceNameDuplicationChecker } from './domain-services/contracts/user-id-device-name-duplication-checker.interface';
import { IGetExpirationTokenDate } from './domain-services/contracts/get-expiration-token-date.interface';
import { TokenModel } from './token-model';
import { LoginCommand } from '../application/login/login.command';

@Injectable()
export class TokenModelFactory {
  constructor(
    @Inject(TOKEN_DATABASE_PROVIDER)
    private tokenProvider: ITokenProvider,
    @Inject(ITokenGenerator)
    private tokenGenerator: ITokenGenerator,
    @Inject(IUserIdDeviceNameDuplicationChecker)
    private userIdDeviceNameDuplicationChecker: IUserIdDeviceNameDuplicationChecker,
    @Inject(IGetExpirationTokenDate)
    private getExpirationTokenDate: IGetExpirationTokenDate,
  ) {}

  public async create(command: LoginCommand): Promise<TokenModel> {
    const tokenModel = await TokenModel.createModel(
      this.tokenGenerator,
      this.userIdDeviceNameDuplicationChecker,
      this.getExpirationTokenDate,
      command.userId,
      command.deviceModel,
      command.deviceOs,
      command.name,
      command.deviceOsVersion,
      command.appVersion,
      command.tokenableType,
    );
    await this.tokenProvider.login(tokenModel.toTokenEntity());
    return tokenModel;
  }
}
