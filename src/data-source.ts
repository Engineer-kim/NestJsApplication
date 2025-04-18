import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
dotenv.config({ path: `.env.${process.env.NODE_ENV || 'development'}` });

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: process.env.DB_NAME || 'db.sqlite',
  entities: ['dist/**/*.entity.js'], // 빌드된 JS 파일 기준
  migrations: ['dist/migrations/*.js'],
  synchronize: false,
});
