import { DomainException } from '../../framework/domain/domain.exception';

export class DuplicateLoginException extends DomainException {
  constructor() {
    super(`DuplicateLoginException`);
  }
}
