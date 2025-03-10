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
    const email = 'asdf@asdf.com'

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

  it('signup as a new user then get the currently logged in user', async () => {
    const email = 'asdf@asdf.com';

    const res = await request(app.getHttpServer())
      .post('/auth/signup')
      .send({ email, password: 'asdf' })
      .expect(201);

    let cookie =  res.get('Set-Cookie') as string[];

    const { body } = await request(app.getHttpServer())
      .get('/auth/whoami')
      .set("Cookie" , cookie)
      .expect(200);

    expect(body.email).toEqual(email);
  });
});
