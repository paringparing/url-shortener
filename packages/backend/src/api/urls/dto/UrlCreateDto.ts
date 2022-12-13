import { IsUrl, IsString, IsOptional } from 'class-validator'

export class UrlCreateDto {
  @IsUrl()
  url: string

  @IsOptional()
  @IsString()
  slug: string
}
