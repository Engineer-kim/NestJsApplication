import {
    CanActivate,
    ExecutionContext,
} from "@nestjs/common";

//CanActivate : 요청이 핸들러에 도달하기 전에 접근을 허용하거나 차단하는 로직을 구현하는 가드 인터페이스
export class AuthGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest()
        
        
        return request.session.userId
    }
}


//실행순서 
//MiddelWare -> Guard -> Interceptor -> response -> ClientResponse
//MiddelWare : 가장 먼저 실행되어 요청 처리
//Guard : 미들웨어 다음으로 실행되어 요청을 처리할지 막을지 결정(인증 , 권한)
//Interceptor : 가드 다음으로 실행되어 요청을 가공하거나 응답을 가공