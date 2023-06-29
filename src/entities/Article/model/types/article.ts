import { type User } from '@/entities/User'
import { type ArticleBlockType, type ArticleType } from '../const/articleConsts'

interface ArticleBlockBase {
  id: string
  type: ArticleBlockType
}

export interface ArticleTextBlock extends ArticleBlockBase {
  title?: string
  type: ArticleBlockType.TEXT
  paragraphs: string[]
}

export interface ArticleImageBlock extends ArticleBlockBase {
  title: string
  type: ArticleBlockType.IMAGE
  src: string
}

export interface ArticleCodeBlock extends ArticleBlockBase {
  type: ArticleBlockType.CODE
  code: string
}

export type ArticleBlock = ArticleImageBlock | ArticleTextBlock | ArticleCodeBlock

export interface Article {
  id: string
  title: string
  user: User
  subtitle: string
  img: string
  views: number
  createdAt: string
  type: ArticleType[]
  blocks: ArticleBlock[]
}
