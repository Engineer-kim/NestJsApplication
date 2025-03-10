import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';

/*엔드 투 엔드 테스트(통합 테스트) 코드 작성 파일
   일반적인 테스트 코드인 spec.ts(단위테스트 파일) 와는 다름름
*/


describe('AppController (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('handles a  signup request', () => {
    const email = 'asdlkjq@akl.com'

    return request(app.getHttpServer())
      .post('/auth/signup')
      .send({ email: email ,password: 'asdlkjq'})
      .expect(201)
      .then((res) => {
        const {id , email} = res.body;
        console.log(res.body);
        expect(email).toEqual(email)
        expect(res.body.accessToken).toBeDefined(); //undefined가 아닌지 확인
      });
  });
});
