import { type User } from 'entities/User'

export enum ArticleType {
  IT = 'IT',
  SCIENCE = 'SCIENCE',
  ECONOMICS = 'ECONOMICS'
}

export enum ArticleBlockType {
  TEXT = 'TEXT',
  CODE = 'CODE',
  IMAGE = 'IMAGE',
}

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

export enum ArticleView {
  LIST = 'list',
  GRID = 'grid'
}

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
