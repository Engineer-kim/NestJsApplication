import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common"
import { UsersService } from "./users.service";
import { randomBytes , scrypt as _scrypt } from "crypto";
import { promisify } from "util";

//promisify를 사용하면 TS에서는 기본적으로 반환 타입을 Unknown으로 설정한다
// 콜백 기반함수를 프로미스기반으로 바꿔준다
// nestJS 는 비동기프로그래밍(프로미스기반)을 지원하기 때문
const scrypt = promisify(_scrypt)

@Injectable()
export class AuthService {  
    constructor(private usersService: UsersService) {}

   async signup(email: string , password: string){
        const users = await this.usersService.find(email)
        if(users.length){
            throw new BadRequestException("Email in use")
        }
        //password hashing
        const salt = randomBytes(8).toString("hex")

        //Sycrypt 는 Buffer 타입의 바이트 배열을 반환
        // AS buffer 하는 이유는 암호화된문자열은 단순 스트링이 아닌 바이너리(버퍼)이기때문
        const hash = (await scrypt(password, salt, 32)) as Buffer
        const result = salt + "." + hash.toString("hex")
        const user = await this.usersService.create(email, result)
        return user

    }

    async signin(email: string , password:string){
        const [user] = await this.usersService.find(email)
        if(!user){
            throw new NotFoundException("Bad Credentials")
        }
        const [salt, storedHash] = user.password.split(".")
        const hash = (await scrypt(password, salt, 32)) as Buffer
        if(storedHash !== hash.toString("hex")){
            throw new BadRequestException("Bad Credentials")
        }
        return user
    }
}