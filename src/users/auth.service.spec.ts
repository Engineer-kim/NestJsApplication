import { Test } from '@nestjs/testing'
import { AuthService } from './auth.service'
import { UsersService } from './users.service'
import { User } from './user.entity'


it('can create an instance of auth service', async () => {

    const fakeUsersService = {
        find: () => Promise.resolve([]), //즉시 해결되는 프로미스 반환 함수(Mock 이랑 같은 역할임)
        create: (email: string, password: string) => Promise.resolve({ id: 1, email, password })
    }

    // 테스트 모듈 생성
    const module = await Test.createTestingModule({
        providers: [
            AuthService,
            {
                //실제 UsersService 대신 fakeUsersService를 사용하라고 알려줌
                provide: UsersService,
                useValue: fakeUsersService
            }
        ]
    }).compile() //모듈을 컴파일하여 사용 가능한 상태로 만듬

    const service = module.get(AuthService) //테스트할 서비스 가져옴
    expect(service).toBeDefined()//서비스가 정의되어있는지 확인(재대로 생성되었는지 확인)
})
