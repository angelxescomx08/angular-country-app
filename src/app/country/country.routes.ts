import { Routes } from '@angular/router';

export const countryRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./layouts/country-layout/country-layout.component').then(
        (m) => m.CountryLayoutComponent
      ),
    children: [
      {
        path: 'by-capital',
        loadComponent: () =>
          import('./pages/by-capital-page/by-capital-page.component').then(
            (m) => m.ByCapitalPageComponent
          ),
      },
      {
        path: '**',
        redirectTo: 'by-capital',
      },
    ],
  },
];
