import { ICommandHandler } from '@nestjs/cqrs';
import { UnitOfWork } from './persistance/unit-of-work.service';

export class TransactionCommandHandler implements ICommandHandler {
  constructor(private readonly unitOfWork: UnitOfWork) {}

  async execute(command: any): Promise<any> {
    await this.unitOfWork.doTransactional(() => command);
  }
}
