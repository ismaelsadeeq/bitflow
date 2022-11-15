import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { IsEmail, Length } from 'class-validator';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  
  @Prop({required:true})
  @Length(3,3)
  phoneCode:string

  @Prop({required:true,unique:true})
  @Length(10,10)
  phoneNumber:string

  @Prop({required:true})
  @Length(2,20)
  firstName:string

  @Prop({})
  @Length(2,20)
  middleName:string

  @Prop({required:true})
  @Length(2,20)
  lastName:string

  @Prop({required:true})
  @Length(2,50)
  businessName:string

  @Prop({})
  @IsEmail()
  email:string

}

export const UserSchema = SchemaFactory.createForClass(User);