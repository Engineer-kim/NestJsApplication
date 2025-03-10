import { ColdObservable } from 'rxjs/internal/testing/ColdObservable';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Report {
  @PrimaryGeneratedColumn() //==> 새로운 행이 테이블에 추가될 때마다 고유한 값을 자동으로 생성 (PK 자동 생성)
  id: number; 

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
}
