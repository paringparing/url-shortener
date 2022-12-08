import { Test, TestingModule } from '@nestjs/testing'
import { edgedbClient } from 'src/database/client'
import { DatabaseModule } from 'src/database/database.module'
import { UrlsService } from './urls.service'

describe('UrlsService', () => {
  let service: UrlsService
  let slug: string = ''

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UrlsService],
      imports: [DatabaseModule],
    }).compile()

    service = module.get<UrlsService>(UrlsService)
  })

  afterAll(async () => {
    if (slug) {
      await edgedbClient.execute(`delete Url filter .slug = <str>$slug;`, {
        slug,
      })
    }
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('should throw not found exception', async () => {
    await expect(service.findUrlBySlug('wowthisistest')).rejects.toThrow(
      'Cannot find URL with following slug: wowthisistest',
    )
  })

  it('should create url', async () => {
    const url = await service.createUrl('https://google.com')

    slug = url.slug

    expect(url).toEqual({ url: 'https://google.com', slug: url.slug })
  })

  it('should throw error on create url(already exists)', async () => {
    await expect(service.createUrl('https://google.com', slug)).rejects.toThrow(
      'URL already exists',
    )
  })

  it('should find url', async () => {
    await expect(service.findUrlBySlug(slug)).resolves.toEqual({
      slug,
      url: 'https://google.com',
    })
  })

  it('should delete url', async () => {
    await expect(service.deleteUrl(slug)).resolves
  })

  it('should throw not found error(already deleted)', async () => {
    await expect(service.deleteUrl(slug)).rejects.toThrow('URL not found')
  })
})
