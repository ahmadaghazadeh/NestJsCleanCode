import { DomainException } from '../../framework/domain/domain.exception';

export class TokenNullException extends DomainException {
  constructor() {
    super(`TokenNullException`);
  }
}
