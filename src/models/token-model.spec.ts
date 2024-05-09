import { TokenModel } from './token-model';
import {
  TokenableTypeNullException,
  UserIdNullException,
} from './exceptions/user-id-null.exception';
import { TokenNullException } from './exceptions/token-null.exception';
import { NameNullException } from './exceptions/name-null.exception';
import { DuplicateLoginException } from './exceptions/duplicate-login.exception';

describe('TokenModel', () => {
  const tokenValue = 'Strong String';

  const tokenGenerator = {
    generateToken: jest.fn(() => {
      return Promise.resolve(tokenValue);
    }),
  };

  const userIdDeviceNameDuplicationChecker = {
    isDuplicate: jest.fn(),
  };

  const getExpirationTokenDate = {
    getDateTime: jest.fn(),
  };

  it('should be create an object of TokenModel', async () => {
    // GIVEN WHEN
    const tokenModel = await getTokenModel();
    // THEN
    expect(tokenModel).toBeInstanceOf(TokenModel);
  });
  it('should be retrieved as a TokenEntity', async () => {
    const tokenModel = await getTokenModel();
    const tokenEntity = tokenModel.toTokenEntity();
    expect(tokenEntity.token).toBe(tokenModel.token);
    expect(tokenEntity.tokenable_type).toBe(tokenModel.tokenableType);
    expect(tokenEntity.user_id).toBe(tokenModel.userId);
    expect(tokenEntity.name).toBe(tokenModel.name);
    expect(tokenEntity.device_os).toBe(tokenModel.deviceOs);
    expect(tokenEntity.app_version).toBe(tokenModel.appVersion);
    expect(tokenEntity.device_os_version).toBe(tokenModel.deviceOsVersion);
    expect(tokenEntity.expires_at).toBe(tokenModel.expiredAt);
    expect(tokenEntity.created_at).toBe(tokenModel.createdAt);
    expect(tokenEntity.device_model).toBe(tokenModel.deviceModel);
  });

  it('should throw DuplicationLoginException if userId and deviceName are login before', async () => {
    // GIVEN
    userIdDeviceNameDuplicationChecker.isDuplicate.mockImplementationOnce(
      () => {
        return Promise.resolve(true);
      },
    );
    // GIVEN WHEN
    const tokenModel = getTokenModel();
    // THEN
    await expect(tokenModel).rejects.toThrow(DuplicateLoginException);
  });

  describe('userId', () => {
    it('should throw UserIdNullException if user_id is null', async () => {
      // GIVEN
      const user_id = null;

      // WHEN
      const tokenModel = () => getTokenModel({ userId: user_id });

      // THEN
      await expect(tokenModel).rejects.toThrow(UserIdNullException);
    });

    it('should be retrieved user_id', async () => {
      // GIVEN
      const user_id = 1;

      // WHEN
      const tokenModel = await getTokenModel({ userId: user_id });

      // THEN
      expect(tokenModel.userId).toBe(user_id);
    });
  });
  describe('deviceModel', () => {
    it('should be retrieved device_model', async () => {
      // GIVEN
      const device_model = 'LG';

      // WHEN
      const tokenModel = await getTokenModel({ deviceModel: device_model });

      // THEN
      expect(tokenModel.deviceModel).toBe(device_model);
    });
  });
  describe('token', () => {
    it('should be called generateToken', async () => {
      // GIVEN
      const otherToken = 'otherToken Value';
      tokenGenerator.generateToken.mockImplementationOnce(() => {
        return Promise.resolve(otherToken);
      });
      //  WHEN
      await getTokenModel();

      // THEN
      expect(tokenGenerator.generateToken).toHaveBeenCalled();
    });

    it('should throw TokenNullException if token is null', async () => {
      // GIVEN
      const tokenValue = null;
      tokenGenerator.generateToken.mockImplementationOnce(() => {
        return Promise.resolve(tokenValue);
      });
      //  WHEN
      const tokenModel = getTokenModel();

      // THEN
      await expect(tokenModel).rejects.toThrow(TokenNullException);
    });

    it('should be retrieved token', async () => {
      // GIVEN
      const tokenExpected = 'This other token';
      tokenGenerator.generateToken.mockImplementationOnce(() => {
        return Promise.resolve(tokenExpected);
      });

      // WHEN
      const tokenModel = await getTokenModel();

      // THEN
      expect(tokenModel.token).toBe(tokenExpected);
    });
  });

  describe('deviceOs', () => {
    it('should be retrieved device_os', async () => {
      // GIVEN
      const device_os = 'LG';

      // WHEN
      const tokenModel = await getTokenModel({ deviceOs: device_os });

      // THEN
      expect(tokenModel.deviceOs).toBe(device_os);
    });
  });

  describe('name', () => {
    it('should throw NameNullException if name is null', async () => {
      // GIVEN
      const name = null;

      //  WHEN
      const tokenModel = () => getTokenModel({ name: name });

      // THEN
      await expect(tokenModel).rejects.toThrow(NameNullException);
    });
    it('should be retrieved name', async () => {
      // GIVEN
      const name = 'API';

      // WHEN
      const tokenModel = await getTokenModel({ name: name });

      // THEN
      expect(tokenModel.name).toBe(name);
    });
  });

  describe('deviceOsVersion', () => {
    it('should be retrieved deviceOsVersion', async () => {
      // GIVEN
      const deviceOsVersion = '14.3';

      // WHEN
      const tokenModel = await getTokenModel({
        deviceOsVersion: deviceOsVersion,
      });

      // THEN
      expect(tokenModel.deviceOsVersion).toBe(deviceOsVersion);
    });
  });

  describe('appVersion ', () => {
    it('should be retrieved appVersion', async () => {
      // GIVEN
      const appVersion = '14.3';

      // WHEN
      const tokenModel = await getTokenModel({ appVersion: appVersion });

      // THEN
      expect(tokenModel.appVersion).toBe(appVersion);
    });
  });

  describe('tokenableType', () => {
    it('should throw TokenableTypeNullException if tokenableType is null', async () => {
      // GIVEN
      const tokenableType = null;

      //  WHEN
      const tokenModel = () => getTokenModel({ tokenableType: tokenableType });

      // THEN
      await expect(tokenModel).rejects.toThrow(TokenableTypeNullException);
    });
    it('should be retrieved tokenableType', async () => {
      // GIVEN
      const tokenableType = 'api//name';

      // WHEN
      const tokenModel = await getTokenModel({ tokenableType: tokenableType });

      // THEN
      expect(tokenModel.tokenableType).toBe(tokenableType);
    });
  });

  describe('createdAt ', () => {
    it('should be retrieved createdAt', async () => {
      // GIVEN
      const createdAt = new Date();
      jest.useFakeTimers().setSystemTime(createdAt);

      //  WHEN
      const tokenModel = await getTokenModel();

      // THEN
      expect(tokenModel.createdAt).toStrictEqual(createdAt);
    });
  });

  describe('expiredAt ', () => {
    it('should be called with plus 30 days', async () => {
      // GIVEN
      const expiredAt = new Date(new Date().getDate() + 30);
      getExpirationTokenDate.getDateTime.mockImplementationOnce(() => {
        return expiredAt;
      });

      //  WHEN
      const tokenModel = await getTokenModel();

      // THEN
      expect(tokenModel.expiredAt).toStrictEqual(expiredAt);
    });
  });

  async function getTokenModel({
    userId = 1,
    deviceModel = 'Lg',
    deviceOs = 'IOS',
    name = 'API',
    deviceOsVersion = '14.1',
    appVersion = '11',
    tokenableType = 'api//name',
  } = {}): Promise<TokenModel> {
    const tokenModel = TokenModel.createModel(
      tokenGenerator,
      userIdDeviceNameDuplicationChecker,
      getExpirationTokenDate,
      userId,
      deviceModel,
      deviceOs,
      name,
      deviceOsVersion,
      appVersion,
      tokenableType,
    );
    return Promise.resolve(tokenModel);
  }
});
