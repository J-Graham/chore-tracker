import { Route } from '@angular/router';
import { HomeComponent } from './components/home/home.components';
export const appRoutes: Route[] = [{
  path: '',
  loadComponent: () => import('./components/home/home.components').then(m => m.HomeComponent)
}];
