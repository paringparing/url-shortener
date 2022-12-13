import { Controller, Post, Body } from '@nestjs/common'
import { UrlsService } from 'src/urls/urls.service'
import { UrlCreateDto } from './dto/UrlCreateDto'
import { UrlCreateResponseDto } from './dto/UrlCreateResponseDto'

@Controller('api/urls')
export class UrlsController {
  constructor(private urlsService: UrlsService) {}

  @Post()
  async createUrl(@Body() data: UrlCreateDto): Promise<UrlCreateResponseDto> {
    const created = await this.urlsService.createUrl(data.url)

    return new UrlCreateResponseDto(created.url, created.slug)
  }
}
