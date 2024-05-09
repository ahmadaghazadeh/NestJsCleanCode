import { Module, Scope } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExtendedCommandBus } from './framework/extended-command-bus';
import { UnitOfWork } from './framework/persistance/unit-of-work.service';
import { CommandBus, CqrsModule, UnhandledExceptionBus } from '@nestjs/cqrs';
import { TOKEN_DATABASE_PROVIDER } from './persistance/postgress/providers/token-provider.interface';
import { TokenProviderService } from './persistance/postgress/services/token-provider.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from './persistance/postgress/data-source';
import { ConfigModule } from '@nestjs/config';
import { Subject, takeUntil } from 'rxjs';
import { IGetExpirationTokenDate } from './models/domain-services/contracts/get-expiration-token-date.interface';
import { GetExpirationTokenDate } from './models/domain-services/get-expiration-token-date.service';
import { ITokenGenerator } from './models/domain-services/contracts/token-generator.interface';
import { TokenGenerator } from './models/domain-services/token-generator.service';
import { IUserIdDeviceNameDuplicationChecker } from './models/domain-services/contracts/user-id-device-name-duplication-checker.interface';
import { UserIdDeviceNameDuplicationChecker } from './models/domain-services/user-id-device-name-duplication-checker.service';
import { JwtModule } from '@nestjs/jwt';
import { TokenModelFactory } from './models/token-model.factory';
import { LoginCommandHandler } from './application/login/login-command1-handler';

export const CommandHandlers = [LoginCommandHandler];

@Module({
  imports: [
    CqrsModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(dataSourceOptions),
    JwtModule.register({
      global: true,
      secret: 'xxxxxxxxxxasdw',
    }),
  ],
  controllers: [AppController],
  providers: [
    {
      provide: TOKEN_DATABASE_PROVIDER,
      useClass: TokenProviderService,
    },
    {
      provide: IGetExpirationTokenDate,
      useClass: GetExpirationTokenDate,
    },
    {
      provide: ITokenGenerator,
      useClass: TokenGenerator,
    },
    {
      provide: IUserIdDeviceNameDuplicationChecker,
      useClass: UserIdDeviceNameDuplicationChecker,
    },
    AppService,
    UnitOfWork,
    UnhandledExceptionBus,
    TokenModelFactory,
    ...CommandHandlers,
  ],
})
export class AppModule {
  private destroy$ = new Subject<void>();

  constructor(private unhandledExceptionsBus: UnhandledExceptionBus) {
    this.unhandledExceptionsBus
      .pipe(takeUntil(this.destroy$))
      .subscribe((exceptionInfo) => {
        console.log(exceptionInfo);
        // Handle exception here
        // e.g. send it to external service, terminate process, or publish a new event
      });
  }

  onModuleDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
