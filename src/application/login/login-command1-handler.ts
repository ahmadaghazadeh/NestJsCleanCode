import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { LoginCommand } from './login.command';

import { LoginResponseDto } from '../../dto/login-response.dto';
import { Inject } from '@nestjs/common';
import {
  ITokenProvider,
  TOKEN_DATABASE_PROVIDER,
} from '../../persistance/postgress/providers/token-provider.interface';
import { ITokenGenerator } from '../../models/domain-services/contracts/token-generator.interface';
import { IUserIdDeviceNameDuplicationChecker } from '../../models/domain-services/contracts/user-id-device-name-duplication-checker.interface';
import { IGetExpirationTokenDate } from '../../models/domain-services/contracts/get-expiration-token-date.interface';
import { TokenModel } from '../../models/token-model';

@CommandHandler(LoginCommand)
export class LoginCommandHandler implements ICommandHandler<LoginCommand> {
  constructor(
    @Inject(TOKEN_DATABASE_PROVIDER)
    private tokenProvider: ITokenProvider,
    @Inject(ITokenGenerator)
    private tokenGenerator: ITokenGenerator,
    @Inject(IUserIdDeviceNameDuplicationChecker)
    private userIdDeviceNameDuplicationChecker: IUserIdDeviceNameDuplicationChecker,
    @Inject(IGetExpirationTokenDate)
    private getExpirationTokenDate: IGetExpirationTokenDate,
  ) {
    console.log('constructor');
    console.log(tokenGenerator);
    console.log(tokenProvider);
    console.log(userIdDeviceNameDuplicationChecker);
    console.log(getExpirationTokenDate);
  }

  async execute(command: LoginCommand): Promise<void> {
    console.log(this.tokenGenerator);
    console.log('Test');
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

    //return new LoginResponseDto(tokenModel.token);
  }
}
