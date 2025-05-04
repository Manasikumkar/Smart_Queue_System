// app.component.ts
import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Smart Queue Management System';
  pageTitle = 'Dashboard'; // default title

  constructor(private router: Router) {
    // Listen for router events
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.updatePageTitle(event.urlAfterRedirects);
      }
    });
  }

  updatePageTitle(url: string) {
    if (url.includes('dashboard')) {
      this.pageTitle = 'Dashboard Overview';
    } else if (url.includes('token')) {
      this.pageTitle = 'Manage Tokens';
    } else if (url.includes('counter')) {
      this.pageTitle = 'Counter Operations';
    } else if (url.includes('service')) {
      this.pageTitle = 'Service Management';
    } else if (url.includes('organization')) {
      this.pageTitle = 'Organization Settings';
    } else {
      this.pageTitle = 'Smart Queue Management System';
    }
  }
}
