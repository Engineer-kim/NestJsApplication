import { Exclude } from 'class-transformer';
import { Entity, Column, PrimaryGeneratedColumn, 
  AfterInsert, AfterUpdate, AfterRemove , OneToMany
 } from 'typeorm';
import { Report } from 'src/reports/report.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  @Exclude()
  password: string;

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
