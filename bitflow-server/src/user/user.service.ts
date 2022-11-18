import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { createUserDto } from 'src/request/request';
import { ResponseHandlerService } from '../response-handler/response-handler.service';
import { User, UserDocument } from '../schema/user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) 
    private userModel:Model<UserDocument>,
    private readonly responseHandler:ResponseHandlerService
  ){}

  async getUser(id:string):Promise<UserDocument> {
    try{
      return await this.userModel.findById(id);
    }
    catch(err){
      return null;
    }

  }
  async createUser(data:createUserDto):Promise<UserDocument>{
    try{
      const user = new this.userModel(data);
      return await user.save();
    }catch(err){
      console.log(err)
      return null
    }

  }

  async updateUser(id:string,data:createUserDto):Promise<any>{
    try{
      const user = await this.userModel.findById(id);
      const updateUser = await user.updateOne(data);
      return this.responseHandler.responseBody(
        true,
        "success",
        null
      )
    }catch(err){
      return this.responseHandler.responseBody(
        false,
        "failed",
        null
      )
    }

  }

  
}
