import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { create } from 'domain';


@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  create(email: string, password: string) {
    const user = this.repo.create({ email, password }); // create=> 생성된 엔티티 인스턴스를 반환
    return this.repo.save(user); // DB에 실제 저장하는곳
  }
}
