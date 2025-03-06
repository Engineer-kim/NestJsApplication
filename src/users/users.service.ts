import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  create(email: string, password: string) {
    const user = this.repo.create({ email, password }); // create=> 생성된 엔티티 인스턴스를 반환
    return this.repo.save(user); // DB에 실제 저장하는곳
  }


  findOne(id: number) {
    return this.repo.findOneBy({ id });
  }


  find(email: string) {
    return this.repo.find({ where: { email } });
  }

  //Partial ==> 일부 속성만 선택적으로 업데이트 가능
  async update(id: number , updateInfo: Partial<User>){
      const user = await this.findOne(id)
      if(!user){
        throw new Error("User Data is not Found")
      }
      //user에 updateInfo 값을 덮어 씌우고 user 의 값이 반환된다
      Object.assign(user, updateInfo) //원본(기존) 객체를 변경함
      return this.repo.save(user)
  }

  async remove(id: number){ //Number 넘기면  객체이므로 산술 연산을 직접 수행하면 암묵적인 변환 발생 가능 => 프리미티브 타입넘길떄는 항상 조심
    const deleteUser = await this.findOne(id)
    if(!deleteUser){
      throw new Error("User Data is not Found")
    }
    //delete 는 엔티티 삭제(=> DB에서 즉시 삭제) , 반환값 없음
    //remove 는 삭제된 엔티티 인스턴스를 반환 
    return this.repo.remove(deleteUser)
  }
    


}
