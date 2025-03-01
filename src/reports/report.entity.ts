import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Report {
  @PrimaryGeneratedColumn() //==> 새로운 행이 테이블에 추가될 때마다 고유한 값을 자동으로 생성 (PK 자동 생성)
  id: number; 

  @Column()
  price: number;
}
