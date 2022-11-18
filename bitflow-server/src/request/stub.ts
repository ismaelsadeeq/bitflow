import { createUserDto } from "./request";


export const userStub = ():createUserDto=> {
  return {
    phoneCode:'+234',
    phoneNumber:'8123456789',
    firstName:'John',
    lastName:'Doe',
    businessName:'Nights Watch',
    email:'',
    middleName:''
  }
}
export const createdUserStub = ()=> {
  return {
    _id:'',
    createdAt:'',
    updatedAt:'',
    phoneCode:'+234',
    phoneNumber:'8123456789',
    firstName:'John',
    lastName:'Doe',
    businessName:'Nights Watch',
    email:'',
    middleName:''
  }
}