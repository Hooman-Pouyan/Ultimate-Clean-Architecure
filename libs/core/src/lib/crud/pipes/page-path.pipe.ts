import { Pipe, PipeTransform } from '@angular/core';
import { buildPagePaths } from '../builders/page-paths.builder';
import { PageType } from '../enums/page.enum';

@Pipe({
  name: 'pagePath'
})
export class PagePathPipe implements PipeTransform {

  transform(pageType: PageType, basePath: string[], id?: string): string[] {
    const pagePaths = buildPagePaths(basePath);

    return pagePaths[pageType](id || '');
  }

}
