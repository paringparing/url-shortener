import { Controller, Get, Param, Redirect } from '@nestjs/common'
import { UrlsService } from './urls.service'

@Controller()
export class UrlsController {
  constructor(private urlsService: UrlsService) {}

  @Get('/:slug')
  @Redirect()
  async handle(@Param('slug') slug: string) {
    const link = await this.urlsService.findUrlBySlug(slug)

    return {
      url: link.url,
      statusCode: 302,
    }
  }
}
