import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const CurrentUser = createParamDecorator(
    (data: never, context: ExecutionContext) => {
         const request = context.switchToHttp().getRequest(); //TTP 요청에 대한 정보를 얻기위함
        return request.currentUser
    }
)