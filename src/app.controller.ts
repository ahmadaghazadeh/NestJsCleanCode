import { Body, Controller, Inject, Post } from '@nestjs/common';
import { LoginResponseDto } from './dto/login-response.dto';
import { LoginRequestDto } from './dto/login-request.dto';
import { LoginCommand } from './application/login/login.command';
import { CommandBus } from '@nestjs/cqrs';
import {
  ITokenProvider,
  TOKEN_DATABASE_PROVIDER,
} from './persistance/postgress/providers/token-provider.interface';
import { ITokenGenerator } from './models/domain-services/contracts/token-generator.interface';
import { IUserIdDeviceNameDuplicationChecker } from './models/domain-services/contracts/user-id-device-name-duplication-checker.interface';
import { IGetExpirationTokenDate } from './models/domain-services/contracts/get-expiration-token-date.interface';

@Controller()
export class AppController {
  constructor(private commandBus: CommandBus) {}

  @Post()
  async login(
    @Body() loginRequestDto: LoginRequestDto,
  ): Promise<LoginResponseDto> {
    return this.commandBus.execute(
      new LoginCommand(
        loginRequestDto.userId,
        loginRequestDto.tokenableType,
        loginRequestDto.name,
        loginRequestDto.deviceModel,
        loginRequestDto.deviceOs,
        loginRequestDto.deviceOsVersion,
        loginRequestDto.appVersion,
      ),
    );
  }
}
