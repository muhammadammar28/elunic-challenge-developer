import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const databaseConfig:TypeOrmModuleOptions =  {
  type: 'mysql',
  host: process.env.APP_DB_HOST || 'localhost',
  port: parseInt(process.env.APP_DB_PORT) || 3306,
  username: process.env.APP_DB_USER || 'app',
  password: process.env.APP_DB_PASS || 'app',
  database: process.env.APP_DB_NAME || 'app',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/../migrations/*{.ts,.js}'],
  synchronize: false,
  logging: process.env.NODE_ENV === 'development',
};
