import { Test, TestingModule } from '@nestjs/testing'
import { DatabaseModule } from 'src/database/database.module'
import { UrlsController } from './urls.controller'
import { UrlsService } from './urls.service'

describe('UrlsController', () => {
  let controller: UrlsController
  let svc: UrlsService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UrlsController],
      providers: [UrlsService],
      imports: [DatabaseModule],
    }).compile()

    controller = module.get<UrlsController>(UrlsController)
    svc = module.get<UrlsService>(UrlsService)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  let slug: string

  it('create url for test', async () => {
    slug = (await svc.createUrl('https://google.com')).slug
  })

  it('fetch undefined slug', async () => {
    await expect(controller.handle('0')).rejects.toThrow(
      `Cannot find URL with following slug: 0`,
    )
  })

  it('expect redirection', async () => {
    await expect(controller.handle(slug)).resolves.toEqual({
      statusCode: 302,
      url: 'https://google.com',
    })
  })

  afterAll(async () => {
    if (slug) {
      await svc.deleteUrl(slug)
    }
  })
})
