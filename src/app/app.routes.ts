import { Route } from '@angular/router';
export const appRoutes: Route[] = [{
  path: '',
  loadComponent: () => import('./components/home/home.components').then(m => m.HomeComponent),
  children: [
    {
      path: 'chore-detail/:id',
      loadComponent: () => import('./components/chore-detail/chore-detail.component').then(m => m.ChoreDetailComponent)
    }
  ]
}];
