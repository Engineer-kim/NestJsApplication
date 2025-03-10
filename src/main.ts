import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';


// app.module.ts에서 정의한 구성들을 기반으로 어플리케이션을 실행하는 진입점이다
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // await app.listen(process.env.PORT ?? 3000);
  await app.listen(3000);
}
bootstrap();
