import { Routes } from '@angular/router';
import { CreditoComponent } from './pages/credito/credito.component';
import { ROUTE } from './shared/enums/route.enum';

export const routes: Routes = [
  {path: '**', redirectTo: ROUTE.CREDITO, pathMatch: 'full'},
  {path: '', redirectTo: ROUTE.CREDITO, pathMatch: 'full'},
  {path: ROUTE.CREDITO, component: CreditoComponent},
];
