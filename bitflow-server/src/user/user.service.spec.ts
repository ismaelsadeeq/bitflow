import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { User, UserDocument, UserSchema } from '../schema/user.schema';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;
  let userModel:Model<UserDocument>

  beforeEach(async () => {
    const userMockRepository = {
      getUser:()=>{
        return {exec:jest.fn(()=>{})}
      },
      createUser: jest.fn(() => {}),
    }
    const module: TestingModule = await Test.createTestingModule({
      providers:[
        UserService,
        {
          provide: getModelToken(User.name),
          useValue:userMockRepository
        }
      ]
    }).compile();

    service = module.get<UserService>(UserService);
    userModel = module.get<Model<UserDocument>>(getModelToken(User.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be able to findOne', () => {
    expect(service).toBeDefined();
  });
});
