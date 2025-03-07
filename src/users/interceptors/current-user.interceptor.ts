import { NestInterceptor,
ExecutionContext, 
CallHandler, 
Injectable 
} from "@nestjs/common";
import { UsersService } from "../users.service";

@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {

    constructor(private usersService: UsersService) {}

    async intercept(context: ExecutionContext, handler: CallHandler){
        const request = context.switchToHttp().getRequest()
        const {userId} = request.session || {}//{} 로 감싸는이유는 안감싸면 request.session 전체가 userId 변수에 담김
        if(userId){
            const user = await this.usersService.findOne(request.session.userId)
            request.currentUser = user
        }
        return handler.handle() //인터셉터에서 할일 다하고 원래 요청 계속 처리하도록 전달
    }
}