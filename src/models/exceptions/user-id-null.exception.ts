import { DomainException } from '../../framework/domain/domain.exception';

export class UserIdNullException extends DomainException {
  constructor() {
    super(`UserIdNullException`);
  }
}

export class TokenableTypeNullException extends DomainException {
  constructor() {
    super(`TokenableTypeNullException`);
  }
}
