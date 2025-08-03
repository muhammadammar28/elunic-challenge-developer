import { Route } from '@angular/router';
import { HomeComponent } from './home/home.component';

export const appRoutes: Route[] = [
  { path: '', component: HomeComponent },
  { 
    path: 'messages', 
    loadComponent: () => import('./messages/messages.component').then(m => m.MessagesComponent)
  },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];
