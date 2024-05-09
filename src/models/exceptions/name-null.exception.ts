import { DomainException } from '../../framework/domain/domain.exception';

export class NameNullException extends DomainException {
  constructor() {
    super(`NameNullException`);
  }
}
