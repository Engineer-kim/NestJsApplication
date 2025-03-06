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

  //Partial ==> Optional
  async update(id: number , updateInfo: Partial<User>){
      const user = await this.findOne(id)
      if(!user){
        throw new Error("User Data is not Found")
      }
      Object.assign(user, updateInfo)
      return this.repo.save(user)
  }


}
