import { ColdObservable } from 'rxjs/internal/testing/ColdObservable';
import { Entity, Column, PrimaryGeneratedColumn , ManyToOne } from 'typeorm';
import { User } from '../users/user.entity'


@Entity()
export class Report {
  @PrimaryGeneratedColumn() //==> 새로운 행이 테이블에 추가될 때마다 고유한 값을 자동으로 생성 (PK 자동 생성)
  id: number; 

  @Column({default: false})
  approved: boolean

  @Column()
  price: number;

  @Column()
  //자동차 제조사 ex) 횬다이 , 닛산 , 벤츠 etc...
  make: string;

  @Column()
  model: string

  @Column()
  year: number

  /**차량 판매 위치*/ 
  @Column()
  //위도
  lng: number

  @Column()
  //경도
  lat: number

  @Column()
  //마일리지
  mileage: number

  //@ManyToOne(관계 맺고 있는 대상의 엔티티 ,  어떤 엔티티와 관계를 맺고 있는지(=반대 방향의 관계))
  @ManyToOne(() => User , (user) => user.reports)//user.reports ==> 사용자가 작성한 리포트
  //유저 입장에서는 1대 다
  user: User
}
