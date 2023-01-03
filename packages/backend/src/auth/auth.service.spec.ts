import { Test, TestingModule } from '@nestjs/testing'
import { AuthService } from './auth.service'
import { UsersModule } from '../users/users.module'
import { edgedbClient } from '../database/client'

describe('AuthService', () => {
  let service: AuthService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [UsersModule],
      providers: [AuthService],
    }).compile()

    service = module.get<AuthService>(AuthService)
  })

  afterAll(async () => {
    await edgedbClient.execute(`delete User filter .userId = "-2";`)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('should create a user', async () => {
    await expect(
      service.findOrCreateUser('-2', 'Test User 2'),
    ).resolves.toEqual({
      id: '-2',
      username: 'Test User 2',
      admin: false,
    })
  })

  it('should edit a user', async () => {
    await expect(
      service.findOrCreateUser('-2', 'Test User 2@'),
    ).resolves.toEqual({
      id: '-2',
      username: 'Test User 2@',
      admin: false,
    })
  })
})
