import { Body, Controller, Param, Post, Get, Query, Delete, Patch, NotFoundException , Session ,UseGuards} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UsersService } from './users.service';
import { Serialize } from '../interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto'; 
import { AuthService } from './auth.service';
import { CurrentUser } from './decorators/current-user.decorator';
import { User } from './user.entity';
import { AuthGuard } from '../guard/auth.guard';

@Controller('auth')
@Serialize(UserDto)
export class UsersController {

  constructor(private usersService: UsersService, 
    private authService: AuthService ) {}

  // @Get('/colors/:color')
  // setColors(@Param('color') color: string, @Session() session: any){
  //   session.color = color
  //   return `<div style="color:${color}">Hello World</div>`
  // }

  // @Get('/colors')
  // getColors(@Session() session: any){
  //   return `<div style="color:${session.color}">Hello World</div>`
  // }

  // @Get('/distinguish')
  // distinguishUser(@Session() session: any){
  //   return this.usersService.findOne(session.userId)
  // }

  @Get('/distinguish')
  @UseGuards(AuthGuard)
  distinguishUser(@CurrentUser() user: User){
    return user
  }

  @Post('/signout')
  signout(@Session() session: any){
    session.userId = null
    //return 'you are signed out'
  }

  @Post('/signup')
  async createUser(@Body() body: CreateUserDto , @Session() session: any) {
    //여기서 굳이 세션이 필요할까? 로그인이 아니라 회원가인데...
    const user = await this.authService.signup(body.email, body.password)
    session.userId = user.id //세션이 userId 라는 키로 벨류인 user.id 를 저장
    return user
  }

  @Post('/signin')
  async signin(@Body() body: CreateUserDto , @Session() session: any) {
    const user = await this.authService.signin(body.email, body.password)
    session.userId = user.id
    return user
  }


  // @UseInterceptors(new SerializSeInterceptor(UserDto)) 바로 아래의 @Serilze 코드와 동일함
  @Get('/:id') 
  async findUser(@Param('id') id: string){
    //user 가 클래스의 인스턴스임 이거를 직렬화 시키는거
    const user = await this.usersService.findOne(parseInt(id)) ///URl 은 모든게 다 String 이기때문에 int로 변환이 안됨
    if(!user){
      throw new NotFoundException('user not found')
    }
    return user
  }


  @Get()
  findAllUsers(@Query('email') email: string) {
    return this.usersService.find(email)
  }

  @Delete('/:id')
  removeUser(@Param('id') id: string){
    return this.usersService.remove(parseInt(id))
  }

  @Patch('/:id')
  updateUser(@Param('id') id: string , @Body() body: UpdateUserDto){
    return this.usersService.update(parseInt(id) , body)
  }

}
