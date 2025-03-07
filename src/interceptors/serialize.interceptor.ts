import { UseInterceptors , NestInterceptor , ExecutionContext, CallHandler } from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from "rxjs/operators"
import { plainToClass } from "class-transformer";

interface ClassConstructor {
// new 연산자로 호출할 수 있는 타입"만 허용합니다. 즉, 인스턴스를 생성할 수 있는 타입
//  결론은 DTO 클래스만  혹은 생성자만 가능 , Strinng, Number, Boolean, Array, Object는 불가능
    new (...args: any[]): {}
}

export function Serialize(dto: ClassConstructor){
    return UseInterceptors(new SerializeInterceptor(dto))
}


export class SerializeInterceptor implements NestInterceptor {
    
    constructor(private dto: any) {}


    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        //console.log('I am running before the handler', context)
        return next.handle().pipe(
            map((data: any) => {
                return plainToClass(
                    this.dto, 
                    data, 
                    {excludeExtraneousValues: true} // excludeExtraneousValues: true 옵션을 사용하면, 클래스에 정의되지 않은 속성은 변환된 클래스 인스턴스에서 제외
                )
            })
    )}
}