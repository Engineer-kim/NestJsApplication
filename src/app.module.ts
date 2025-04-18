import { Module, ValidationPipe ,MiddlewareConsumer } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';
import { User } from './users/user.entity';
import { Report } from './reports/report.entity';
import { APP_PIPE } from '@nestjs/core';

const cookieSession = require('cookie-session'); //미들웨어 가져옴

// 구성 요소들에 대한 정의
@Module({
  imports: [
    //ConfigModule 를 통해 .env 파일에 환경 변수를 저장하고 쉽게 불러올 수 있음
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    TypeOrmModule.forRootAsync({  //환경 변수 기반의 동적 설정
      inject: [ConfigService],
      useFactory: (config: ConfigService) => { //useFactory 동적으로 프로바이더(Spring에서의 서비스) 생성가능
        return {
          type: 'sqlite',
          database: config.get('DB_NAME'),
          entities: [User, Report], //자바의 그 엔티티 맞음 (DB 테이블과 매핑되는 클래스)
          synchronize: true,  // 상용에서 True로 하면 안댐 큰일남
        }
      },
    }),
  // TypeOrmModule.forRoot(),
  UsersModule, ReportsModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE, //APP_PIPE 키에 대한 전역 파이프 제공
      useValue: new ValidationPipe({
        whitelist: true, // DTO에 정의되지 않은 속성을 자동으로 제거
      }),
    }
  ],
})
export class AppModule {
  constructor(private configService: ConfigService) {} //ConfigService => 환경변수를 가져오는 서비스
  //configure ==> 미들웨어 구성함수 (app.use 랑 비슷한 역할)
  configure(consumer: MiddlewareConsumer) { //MiddlewareConsumer =>  미들웨어를 등록하고 관리하는 헬퍼 클래스
    consumer.apply(
      cookieSession({
        keys: [this.configService.get('COOKIE_KEY')], //환경변수에서 쿠키 키를 가져옴
      }),
    )
    .forRoutes('*'); //모든 라우터에 대해서 쿠키 세션의 키값을 asdfasdf로 설정
  }
}
