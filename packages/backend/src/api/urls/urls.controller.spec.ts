import { Test, TestingModule } from '@nestjs/testing'
import { edgedbClient } from 'src/database/client'
import { UrlsModule } from 'src/urls/urls.module'
import { UrlCreateDto } from './dto/UrlCreateDto'
import { UrlsController } from './urls.controller'

describe('UrlsController', () => {
  let controller: UrlsController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UrlsController],
      imports: [UrlsModule],
    }).compile()

    controller = module.get<UrlsController>(UrlsController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  let slug: string = null!

  it('Should return url object', async () => {
    const dto = new UrlCreateDto()

    dto.url = 'https://google.com'

    let result = controller.createUrl(dto)

    await expect(result.then((x) => x.url)).resolves.toBe('https://google.com') // Check the url matches with the data requested

    slug = (await result).slug
  })

  afterAll(async () => {
    if (slug) {
      await edgedbClient.execute(`delete Url filter .slug = <str>$slug;`, {
        slug,
      })
    }
  })
})
