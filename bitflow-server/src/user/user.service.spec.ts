import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Connection, connect, Model } from "mongoose";
import { ResponseHandlerModule } from '../response-handler/response-handler.module';
import { User, UserSchema } from '../schema/user.schema';
import { UserService } from './user.service';
import { createdUserStub, userStub } from '../request/stub';
import { MongoMemoryServer } from "mongodb-memory-server";


describe('UserService', () => {
  let service: UserService;
  let mongod: MongoMemoryServer;
  let mongoConnection: Connection;
  let userModel: Model<User>;

  beforeEach(async () => {
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    mongoConnection = (await connect(uri)).connection;
    userModel = mongoConnection.model(User.name, UserSchema);
    const module: TestingModule = await Test.createTestingModule({
      imports:[
        ResponseHandlerModule
      ],
      providers:[
        UserService,
        {provide: getModelToken(User.name), useValue: userModel},
      ]
    }).compile();
    service = module.get<UserService>(UserService);
  });
  afterAll(async () => {
    await mongoConnection.dropDatabase();
    await mongoConnection.close();
    await mongod.stop();
  });

  afterEach(async () => {
    const collections = mongoConnection.collections;
    for (const key in collections) {
      const collection = collections[key];
      await collection.deleteMany({});
    }
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  
  it('create user',async()=>{
      const createUser = await service.createUser(userStub())
      expect(createUser.firstName).toBe(createdUserStub().firstName)
  })
});
