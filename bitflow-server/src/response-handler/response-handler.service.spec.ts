import { Test, TestingModule } from '@nestjs/testing';
import { ResponseHandlerService } from './response-handler.service';

describe('ResponseHandlerService', () => {
  let service: ResponseHandlerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ResponseHandlerService],
    }).compile();

    service = module.get<ResponseHandlerService>(ResponseHandlerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should return status, message, and data given',()=>{
    const status = true;
    const message = "success";
    const data = [{id:1,name:"Abubakar",email:"email@domain.com"},{id:1,name:"Sadiq",email:"email2@domain.com"}]
    let response = service.responseBody(status,message,data);
    expect(response.status).toBe(status)
    expect(response.message).toBe(message)
    expect(response.data).toBe(data)
  })
  it('should return status, message, and data given',()=>{
    const status = false;
    const message = "failed";
    const data = null;
    let response = service.responseBody(status,message,data);
    expect(response.status).toBe(status)
    expect(response.message).toBe(message)
    expect(response.data).toBe(data)
  })
});
