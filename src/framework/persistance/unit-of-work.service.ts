import { Injectable, Scope } from '@nestjs/common';
import { DataSource, EntityManager } from 'typeorm';

@Injectable()
export class UnitOfWork {
  private manager: EntityManager;

  constructor(private dataSource: DataSource) {
    this.manager = this.dataSource.manager;
  }

  getManager() {
    return this.manager;
  }

  async doTransactional<T>(fn): Promise<T> {
    return await this.dataSource.transaction(async (manager) => {
      this.manager = manager;
      return fn(manager);
    });
  }
}
