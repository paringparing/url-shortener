import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import { EdgeDBClient } from 'src/database/client'
import { DI } from 'src/utils/DI'
import { createUser } from './queries/createUser.edgeql'
import { deleteUser } from './queries/deleteUser.edgeql'
import { findUserById } from './queries/findUserById.edgeql'
import { User } from './types'

@Injectable()
export class UsersService {
  constructor(@Inject(DI.EdgeDB) private db: EdgeDBClient) {}

  /**
   * Finds a user by id
   * @param id id of the user to find
   * @returns {User}
   */
  async findUserById(id: string): Promise<User | null> {
    const u = await findUserById(this.db, { userId: id })

    if (!u) throw new NotFoundException('User not found')

    return { id: u.userId, admin: u.admin, username: u.username }
  }

  /**
   * Creates a user
   * @param id the id to use for the user
   * @param username the username to set for the user
   * @returns {User}
   */
  async createUser(id: string, username: string): Promise<User> {
    const u = await createUser(this.db, {
      userId: id,
      username,
    })

    return { id: u.userId, admin: u.admin, username: u.username }
  }

  /**
   * Deletes a user
   * @param id the user id to delete
   * @returns {string}
   */
  async deleteUser(id: string): Promise<void> {
    const deleted = await deleteUser(this.db, { userId: id })

    if (!deleted) throw new NotFoundException('User not found')
  }
}
