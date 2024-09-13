import { PageType } from '../enums/page.enum';

export type PagePath = Record<PageType, (id?: string) => string[]>