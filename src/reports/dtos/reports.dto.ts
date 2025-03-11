import { Expose, Transform } from 'class-transformer';

export class ReportDto {
    //@Expose 데코레이터 붙은것만 직렬화/역직렬화 과정에서 노출 가능
  @Expose() //직렬화 / 역직렬화 과정에서 객체는 어떻게 처리 될지 결정하는데 사용됨
  id: number;
  @Expose()
  price: number;
  @Expose()
  year: number;
  @Expose()
  lng: number;
  @Expose()
  lat: number;
  @Expose()
  make: string;
  @Expose()
  model: string;
  @Expose()
  mileage: number;
  @Expose()
  approved: boolean

  @Transform(({ obj }) => obj.user.id) //obj에서 user 속성을 참조하고, 그 user 속성의 id 값을 userId에 할당
  @Expose()
  userId: number;
}
