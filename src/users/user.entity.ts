import { Exclude } from 'class-transformer';
import { Entity, Column, PrimaryGeneratedColumn, AfterInsert, AfterUpdate, AfterRemove } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  @Exclude()
  password: string;

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
