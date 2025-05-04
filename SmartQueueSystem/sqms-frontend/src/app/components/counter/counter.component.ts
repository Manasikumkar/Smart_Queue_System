import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Counter } from '../../models/counter.model';
import { CounterService } from '../../services/counter.service';
import { Organization } from '../../models/organization.model';
import { OrganizationService } from '../../services/organization.service';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css']
})
export class CounterComponent implements OnInit {
  counters: Counter[] = [];
  organizations: Organization[] = [];
  counterForm: FormGroup;
  isLoading = false;
  errorMessage: string | null = null;
  successMessage: string | null = null;
  showForm = false;

  constructor(
    private counterService: CounterService,
    private orgService: OrganizationService,
    private fb: FormBuilder
  ) {
    this.counterForm = this.fb.group({
      counterNumber: ['', [Validators.required, Validators.min(1)]],
      staffName: ['', [Validators.required, Validators.minLength(2)]],
      organizationId: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.isLoading = true;
    this.errorMessage = null;
    
    this.orgService.getAll().subscribe({
      next: (orgs) => {
        this.organizations = orgs;
        this.loadCounters();
      },
      error: (err) => {
        this.handleError('Failed to load organizations. Please try again later.');
      }
    });
  }

  loadCounters(): void {
    this.counterService.getAll().subscribe({
      next: (counters) => {
        this.counters = counters;
        this.isLoading = false;
      },
      error: (err) => {
        this.handleError('Failed to load counters. Please try again later.');
      }
    });
  }

  toggleForm(): void {
    this.showForm = !this.showForm;
    if (!this.showForm) {
      this.counterForm.reset();
    }
  }

  createCounter(): void {
    if (this.counterForm.invalid) {
      this.markFormAsTouched();
      return;
    }

    const formValue = this.counterForm.value;
    const selectedOrg = this.organizations.find(org => org.id === +formValue.organizationId);

    if (!selectedOrg) {
      this.handleError('Selected organization not found');
      return;
    }

    const newCounter: Counter = {
      counterNumber: formValue.counterNumber,
      staffName: formValue.staffName,
      organization: selectedOrg
    };

    this.isLoading = true;
    this.errorMessage = null;
    
    this.counterService.create(newCounter).subscribe({
      next: () => {
        this.successMessage = 'Counter created successfully!';
        this.counterForm.reset();
        this.showForm = false;
        setTimeout(() => this.successMessage = null, 3000);
        this.loadCounters();
      },
      error: (err) => {
        this.handleError('Failed to create counter. Please try again.');
      }
    });
  }

  private markFormAsTouched(): void {
    Object.values(this.counterForm.controls).forEach(control => {
      control.markAsTouched();
    });
  }

  private handleError(message: string): void {
    this.errorMessage = message;
    this.isLoading = false;
    setTimeout(() => this.errorMessage = null, 5000);
  }

  getOrganizationName(orgId: number): string {
    const org = this.organizations.find(o => o.id === orgId);
    return org ? org.name : 'Unknown';
  }
}