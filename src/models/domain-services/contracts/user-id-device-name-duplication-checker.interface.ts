export interface IUserIdDeviceNameDuplicationChecker {
  isDuplicate(userId: number, deviceName: string): Promise<boolean>;
}

export const IUserIdDeviceNameDuplicationChecker =
  'IUserIdDeviceNameDuplicationChecker';
