import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TokenComponent } from './components/token/token.component';
import { CounterComponent } from './components/counter/counter.component';
import { ServiceComponent } from './components/service/service.component';
import { OrganizationComponent } from './components/organization/organization.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    TokenComponent,
    CounterComponent,
    ServiceComponent,
    OrganizationComponent
  ],
  imports: [
    BrowserModule, 
    RouterModule,
    AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
