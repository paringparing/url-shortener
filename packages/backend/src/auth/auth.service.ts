import { Injectable } from '@nestjs/common'
import { UsersService } from '../users/users.service'
import { User } from '../users/types'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

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

  async createToken(user: User): Promise<string> {
    return this.jwtService.signAsync({
      id: user.id,
    })
  }
}
