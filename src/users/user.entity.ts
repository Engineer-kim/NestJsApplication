import { Exclude } from 'class-transformer';
import { Entity, Column, PrimaryGeneratedColumn, 
  AfterInsert, AfterUpdate, AfterRemove , OneToMany,
  Collection
 } from 'typeorm';
import { Report } from '../reports/report.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column({default : true})
  admin: boolean

  //() => Report 함수로 감싸는 이유 => Report 와 User 클래스 두 파일이 실행되고 난후 
  //해당 OneToMany 데코레이터가 실행되야 되기 때문
  @OneToMany(() => Report , (report) => report.user)
  reports: Report[]


  //새로운 사용자 인서트시 아래 함수 실행됨
  @AfterInsert()
  logInsert(){
      console.log('Inserted User with Id ' , this.id)
  }


  @AfterUpdate()
  logUpdate(){
    console.log('Updated User with Id ' , this.id)
  }

  @AfterRemove()
  logRemove(){
    console.log('Removed User with Id ' , this.id)
  }

}
