import { TransactionCommandHandler } from './transaction-command-handler';
import { Injectable } from '@nestjs/common';
import { CommandBus, ICommand } from '@nestjs/cqrs';
import { UnitOfWork } from './persistance/unit-of-work.service';

@Injectable()
export class ExtendedCommandBus {
  constructor(private readonly commandBus: CommandBus) {}

  async execute<T extends ICommand, R = any>(command: T): Promise<R> {
    //const transaction = new TransactionCommandHandler(this.unitOfWork);
    return await this.commandBus.execute(command);
    //return await this.commandBus.execute(transaction.execute(command));
  }
}
