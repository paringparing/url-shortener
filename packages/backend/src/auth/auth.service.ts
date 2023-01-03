import { Injectable } from '@nestjs/common'
import { UsersService } from '../users/users.service'
import { User } from '../users/types'

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async findOrCreateUser(id: string, username: string): Promise<User> {
    try {
      let user = await this.usersService.findUserById(id)

      if (user.username != username) {
        user = await this.usersService.changeUsername(id, username)
      }

      return user
    } catch {
      return await this.usersService.createUser(id, username)
    }
  }
}
