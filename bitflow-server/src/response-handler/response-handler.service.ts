import { Injectable } from '@nestjs/common';

@Injectable()
export class ResponseHandlerService {
  data;
  status:boolean;
  message:string;
  public static instance:ResponseHandlerService = new ResponseHandlerService();

  constructor(){
    this.data = {}
  }

  public responseBody(status:boolean,message:string,data){
    if(data) this.data = data;
    this.status = status;
    this.message = message;
    return {status:this.status,message:this.message,data:this.data}
  }
}
