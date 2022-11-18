import { IsString, Length,IsEmail, IsOptional, } from "class-validator";

export class createUserDto {
  @IsString()
  @Length(1,3)
  phoneCode:string

  @IsString()
  @Length(10,10)
  phoneNumber:string

  @IsString()
  @Length(2,20)
  firstName:string

  @Length(2,20)
  @IsOptional()
  middleName:string

 
  @Length(2,20)
  @IsString()
  lastName:string

 
  @Length(2,50)
  @IsString()
  businessName:string

  @IsOptional()
  @IsEmail()
  @IsString()
  email:string
}