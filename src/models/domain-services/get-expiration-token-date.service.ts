import { IGetExpirationTokenDate } from './contracts/get-expiration-token-date.interface';
import { Injectable, Scope } from '@nestjs/common';

@Injectable()
export class GetExpirationTokenDate implements IGetExpirationTokenDate {
  getDateTime(): Date {
    const days = 30; // read form env
    const now = new Date();
    return new Date(now.getDate() + days);
  }
}
