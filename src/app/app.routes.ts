import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('../pages/main/main.component').then((m) => m.MainComponent),
  },
  {
    path: 'politicas_reserva',
    loadComponent: () =>
      import('../pages/politicas/politicas.component').then(
        (m) => m.PoliticasComponent
      ),
  },
  {
    path: 'galeria',
    loadComponent: () =>
      import('../pages/galery/galery.component').then(
        (m) => m.GaleryComponent
      ),
  },
  {
    path: 'planes',
    loadComponent: () =>
      import('../pages/planes/planes.component').then((m) => m.PlanesComponent),
    children: [
      {
        path: '',
        loadComponent: () =>
          import(
            '../pages/planes/pages/plan-list/plan-list.component'
          ).then((p) => p.PlanListComponent),
      },
      {
        path: 'detalles',
        loadComponent: () =>
          import(
            '../pages/planes/pages/plan-details/plan-details.component'
          ).then((p) => p.PlanDetailsComponent),
      },
    ],
  },
];
