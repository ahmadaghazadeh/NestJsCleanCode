import { DataSource, DataSourceOptions } from 'typeorm';
import { TokenEntity } from './entites/token.entity';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'postgres',
  //entities: ['dist/**/*.entity.ts'],
  entities: [TokenEntity],
  migrations: ['dist/db/migrations/*.ts'],
  synchronize: true,
};
const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
