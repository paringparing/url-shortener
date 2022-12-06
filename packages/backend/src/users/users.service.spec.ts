import { Test, TestingModule } from '@nestjs/testing'
import { edgedbClient } from 'src/database/client'
import { DatabaseModule } from 'src/database/database.module'
import { UsersService } from './users.service'

describe('UsersService', () => {
  let service: UsersService
  let userId: string

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
      imports: [DatabaseModule],
    }).compile()

    service = module.get<UsersService>(UsersService)
  })

  afterAll(async () => {
    await edgedbClient.execute(`delete User filter .userId = "-1";`)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('find an undefined user', async () => {
    await expect(service.findUserById('-1')).rejects.toThrowError(
      'User not found',
    )
  })

  it('create a user', async () => {
    const action = service.createUser('-1', 'Test User')
    await expect(action).resolves.toEqual({
      id: '-1',
      username: 'Test User',
      admin: false,
    })
    const { id } = await action

    userId = id
  })

  it('userId should be defined', () => {
    expect(userId).toBeDefined()
  })

  it('find an undefined user', async () => {
    await expect(service.findUserById(userId)).resolves.toEqual({
      id: '-1',
      username: 'Test User',
      admin: false,
    })
  })

  it('delete a user', async () => {
    await expect(service.deleteUser(userId)).resolves.toBeUndefined()
  })

  it('delete a non-existing user', async () => {
    await expect(service.deleteUser(userId)).rejects.toThrow('User not found')
  })
})
