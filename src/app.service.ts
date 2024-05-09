import { Injectable, Logger } from '@nestjs/common';
import { LoginResponseDto } from './dto/login-response.dto';
import { LoginCommand } from './application/login/login.command';
import { CommandBus } from '@nestjs/cqrs';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);

  constructor(private commandBus: CommandBus) {}

  async login(logInCommand: LoginCommand): Promise<LoginResponseDto> {
    return this.commandBus.execute(
      new LoginCommand(
        logInCommand.userId,
        logInCommand.tokenableType,
        logInCommand.name,
        logInCommand.deviceModel,
        logInCommand.deviceOs,
        logInCommand.deviceOsVersion,
        logInCommand.appVersion,
      ),
    );
  }
}
