import { Body, Controller, Param, Post, Get, Query, Delete, Patch, NotFoundException} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UsersService } from './users.service';
import { Serialize } from '../interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto'; 
import { AuthService } from './auth.service';

@Controller('auth')
@Serialize(UserDto)
export class UsersController {

  constructor(private usersService: UsersService, 
    private authService: AuthService ) {}

  @Post('/signup')
  createUser(@Body() body: CreateUserDto) {
    this.authService.signup(body.email, body.password)
  }

  @Post('/signin')
  login(@Body() body: CreateUserDto) {
    this.authService.signin(body.email, body.password)
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
