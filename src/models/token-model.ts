import {
  TokenableTypeNullException,
  UserIdNullException,
} from './exceptions/user-id-null.exception';
import { ITokenGenerator } from './domain-services/contracts/token-generator.interface';
import { TokenNullException } from './exceptions/token-null.exception';
import { NameNullException } from './exceptions/name-null.exception';
import { IUserIdDeviceNameDuplicationChecker } from './domain-services/contracts/user-id-device-name-duplication-checker.interface';
import { DuplicateLoginException } from './exceptions/duplicate-login.exception';
import { IGetExpirationTokenDate } from './domain-services/contracts/get-expiration-token-date.interface';
import { TokenEntity } from '../persistance/postgress/entites/token.entity';

export class TokenModel {
  userId: number;
  deviceModel: string;
  token: string;
  deviceOs: string;
  name: string;
  deviceOsVersion: string;
  appVersion: string;
  tokenableType: string;
  createdAt: Date;
  expiredAt: Date;

  public static async createModel(
    tokenGenerator: ITokenGenerator,
    userIdDeviceNameDuplicationChecker: IUserIdDeviceNameDuplicationChecker,
    getExpirationTokenDate: IGetExpirationTokenDate,
    userId: number,
    deviceModel: string,
    deviceOs: string,
    name: string,
    deviceOsVersion: string,
    appVersion: string,
    tokenableType: string,
  ): Promise<TokenModel> {
    const tokenModel = new TokenModel();
    tokenModel.setUserId(userId);
    tokenModel.deviceModel = deviceModel;
    await tokenModel.setToken(tokenGenerator);
    tokenModel.deviceOs = deviceOs;
    tokenModel.setName(name);
    tokenModel.deviceOsVersion = deviceOsVersion;
    tokenModel.appVersion = appVersion;
    tokenModel.setTokenableType(tokenableType);
    if (
      await userIdDeviceNameDuplicationChecker.isDuplicate(userId, deviceModel)
    ) {
      throw new DuplicateLoginException();
    }
    tokenModel.createdAt = new Date();
    tokenModel.expiredAt = getExpirationTokenDate.getDateTime();
    return tokenModel;
  }

  public toTokenEntity(): TokenEntity {
    const tokenEntity = new TokenEntity();
    tokenEntity.user_id = this.userId;
    tokenEntity.token = this.token;
    tokenEntity.device_model = this.deviceModel;
    tokenEntity.tokenable_type = this.tokenableType;
    tokenEntity.name = this.name;
    tokenEntity.device_os = this.deviceOs;
    tokenEntity.expires_at = this.expiredAt;
    tokenEntity.created_at = this.createdAt;
    tokenEntity.device_os_version = this.deviceOsVersion;
    tokenEntity.app_version = this.appVersion;
    return tokenEntity;
  }

  private setTokenableType(tokenableType: string) {
    if (tokenableType == null) {
      throw new TokenableTypeNullException();
    }
    this.tokenableType = tokenableType;
  }

  private setName(name: string) {
    if (name == null) {
      throw new NameNullException();
    }
    this.name = name;
  }

  private setUserId(userId: number) {
    if (userId == null) {
      throw new UserIdNullException();
    }
    this.userId = userId;
  }

  private async setToken(tokenGenerator: ITokenGenerator) {
    const payload = { sub: this.userId, expiredAt: this.expiredAt };
    const tokenGenerated = await tokenGenerator.generateToken(payload);
    if (tokenGenerated == null) {
      throw new TokenNullException();
    }
    this.token = tokenGenerated;
  }
}
