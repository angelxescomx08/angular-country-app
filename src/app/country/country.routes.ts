import { Routes } from '@angular/router';

export const countryRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/by-capital-page/by-capital-page.component').then(
        (m) => m.ByCapitalPageComponent
      ),
  },
  {
    path: '**',
    redirectTo: ''
  }
];
