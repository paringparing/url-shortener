import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { EdgeDBClient } from 'src/database/client'
import { DI } from 'src/utils/DI'
import { createUrl } from './queries/createUrl.edgeql'
import { deleteUrl } from './queries/deleteUrl.edgeql'
import { findUrlBySlug } from './queries/findUrlBySlug.edgeql'
import { Url } from './types'

@Injectable()
export class UrlsService {
  constructor(@Inject(DI.EdgeDB) private db: EdgeDBClient) {}

  /**
   * Finds a url from database by slug
   * @param slug The slug for link
   * @returns The Url fetched from database
   */
  async findUrlBySlug(slug: string): Promise<Url> {
    const url = await findUrlBySlug(this.db, { slug })

    if (!url)
      throw new NotFoundException(
        `Cannot find URL with following slug: ${slug}`,
      )

    return { slug: url.slug, url: url.url }
  }

  /**
   * Creates a url with slug
   * @param slug The slug for link
   * @returns The Url fetched from database
   */
  async createUrl(
    url: string,
    slug: string = Date.now().toString(36),
  ): Promise<Url> {
    const existing = await findUrlBySlug(this.db, { slug })

    if (existing) throw new BadRequestException('URL already exists')

    const item = await createUrl(this.db, { slug, url })

    return {
      slug: item.slug,
      url: item.url,
    }
  }

  async deleteUrl(slug: string): Promise<void> {
    const deleted = await deleteUrl(this.db, { slug })

    if (!deleted) throw new NotFoundException('URL not found')
  }
}
