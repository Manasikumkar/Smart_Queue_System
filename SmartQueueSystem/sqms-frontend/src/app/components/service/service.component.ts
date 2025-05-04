import { Component, OnInit } from '@angular/core';
import { ServiceType } from '../../models/service-type.model';
import { ServiceTypeService } from '../../services/service-type.service';
import { Organization } from '../../models/organization.model';
import { OrganizationService } from '../../services/organization.service';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: [] // Removed CSS file reference (using Bootstrap utilities)
})
export class ServiceComponent implements OnInit {
  services: ServiceType[] = [];
  organizations: Organization[] = [];
  newService: ServiceType = { 
    id: 0, 
    name: '', 
    description: '', 
    organization: { id: 0, name: '', type: '' } 
  };
  
  isLoading: boolean = true;
  isSubmitting: boolean = false;
  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(
    private serviceService: ServiceTypeService,
    private orgService: OrganizationService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.isLoading = true;
    this.errorMessage = null;
    
    this.orgService.getAll().subscribe({
      next: (orgs) => {
        this.organizations = orgs;
        this.loadServices();
      },
      error: (err) => {
        this.handleError('Failed to load organizations');
      }
    });
  }

  loadServices(): void {
    this.serviceService.getAll().subscribe({
      next: (services) => {
        this.services = services;
        this.isLoading = false;
      },
      error: (err) => {
        this.handleError('Failed to load services');
      }
    });
  }

  createService(): void {
    if (!this.validateService()) return;

    this.isSubmitting = true;
    this.errorMessage = null;
    this.successMessage = null;

    this.serviceService.create(this.newService).subscribe({
      next: () => {
        this.successMessage = 'Service created successfully!';
        this.resetForm();
        this.loadServices();
      },
      error: (err) => {
        this.handleError('Failed to create service');
      },
      complete: () => {
        this.isSubmitting = false;
      }
    });
  }

  private validateService(): boolean {
    if (!this.newService.name.trim()) {
      this.errorMessage = 'Service name is required';
      return false;
    }
    if (this.newService.organization.id === 0) {
      this.errorMessage = 'Please select a valid organization';
      return false;
    }
    return true;
  }

  private resetForm(): void {
    this.newService = { 
      id: 0, 
      name: '', 
      description: '', 
      organization: { id: 0, name: '', type: '' } 
    };
  }

  private handleError(message: string): void {
    this.errorMessage = message;
    this.isLoading = false;
    this.isSubmitting = false;
  }
}