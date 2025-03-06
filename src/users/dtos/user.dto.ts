import { Expose } from "class-transformer"

export class UserDto {
    @Expose() // 해당 속성을 보여주라
    id: number

    @Expose()
    email: string
}