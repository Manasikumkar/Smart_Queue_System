import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TokenComponent } from './components/token/token.component';
import { CounterComponent } from './components/counter/counter.component';
import { ServiceComponent } from './components/service/service.component';
import { OrganizationComponent } from './components/organization/organization.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'tokens', component: TokenComponent },
  { path: 'counters', component: CounterComponent },
  { path: 'services', component: ServiceComponent },
  { path: 'organizations', component: OrganizationComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
