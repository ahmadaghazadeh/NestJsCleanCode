import { ICommand } from '@nestjs/cqrs';

export class LoginCommand implements ICommand {
  constructor(
    public userId: number,
    public tokenableType: string,
    public name: string,
    public deviceModel?: string,
    public deviceOs?: string,
    public deviceOsVersion?: string,
    public appVersion?: string,
  ) {}
}
