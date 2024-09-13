import { inject, Injectable, signal } from '@angular/core';
import { NavigationEnd, NavigationSkipped, Router, Scroll } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { filter, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShellBreadcrumbService {
  private router = inject(Router);

  private readonly _items = signal<MenuItem[]>([]);
  readonly items = this._items.asReadonly();

  constructor() {
    this.update(location.pathname);
    this.registerEventHandlers();
  }

  registerEventHandlers() {
    this.router.events.pipe(
      filter(v => v instanceof NavigationSkipped),
      map(v => v as NavigationSkipped)
    ).subscribe(() => {
      const routeState = this.router.getCurrentNavigation()?.extras.state;
      this.setTitle(routeState && routeState['title']);
    });

    const routeObserver = (route: NavigationEnd) => {
      this.update(route.urlAfterRedirects, this.router.getCurrentNavigation()?.extras.state);
    };

    this.router.events.pipe(
      filter(v => v instanceof Scroll),
      map(v => (v as Scroll).routerEvent as NavigationEnd),
      filter(r => r.url === '/'),
    ).subscribe(routeObserver);

    this.router.events.pipe(
      filter(v => v instanceof NavigationEnd),
      map(v => v as NavigationEnd)
    ).subscribe(routeObserver);
  }

  update(routeUrl: string, routeState?: { [p: string]: any }) {
    const urlSegments = routeUrl.split('/').filter(v => v.length);

    if (!urlSegments?.length) {
      return;
    }

    const labels = urlSegments.map(v => v.toLowerCase()
      .replace(/(?:^|\s|\/|\-)\w/g, (match) => match.toUpperCase())
      .replaceAll('-', ' '));

    const items = [];
    const hasId = /\d/.test(labels[labels.length - 1]);

    for (let i = 0; i < urlSegments.length; i++) {
      const sectionUrl = urlSegments.slice(0, i + 1).join('/');
      const routerLink = !['edit', 'view'].includes(urlSegments[i]) && !routeUrl.endsWith(sectionUrl)
        ? sectionUrl
        : '';
      let label = labels[i];

      if (hasId && i === urlSegments.length - 1) {
        label = (routeState && routeState['title']) || '...';
      }

      items.push({ label, routerLink });
    }

    this._items.set(items);
  }

  setTitle(title: string) {
    if (!title?.length) {
      return;
    }

    this._items.mutate(items => items[items.length - 1].label = title);
  }
}
