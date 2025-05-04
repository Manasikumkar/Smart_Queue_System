import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Organization } from '../../models/organization.model';
import { OrganizationService } from '../../services/organization.service';

@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.css']
})
export class OrganizationComponent implements OnInit {
  organizations: Organization[] = [];
  organizationForm: FormGroup;
  editingOrg: Organization | null = null;
  isLoading = false;
  displayDialog = false;
  showDeleteConfirm = false;
  orgToDelete: number | null = null;
  messages: {severity: string, summary: string, detail: string}[] = [];

  constructor(
    private organizationService: OrganizationService,
    private fb: FormBuilder
  ) {
    this.organizationForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      type: ['', Validators.required],
      address: [''],
      contactEmail: ['', Validators.email],
      phoneNumber: ['']
    });
  }

  ngOnInit(): void {
    this.loadOrganizations();
  }

  loadOrganizations(): void {
    this.isLoading = true;
    this.organizationService.getAll().subscribe({
      next: (data) => {
        this.organizations = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.showMessage('error', 'Error', 'Failed to load organizations');
        this.isLoading = false;
      }
    });
  }

  showAddDialog(): void {
    this.editingOrg = null;
    this.organizationForm.reset();
    this.displayDialog = true;
  }

  showEditDialog(org: Organization): void {
    this.editingOrg = { ...org };
    this.organizationForm.patchValue(org);
    this.displayDialog = true;
  }

  saveOrganization(): void {
    if (this.organizationForm.invalid) return;

    this.isLoading = true;
    const orgData = this.organizationForm.value;

    const operation = this.editingOrg
      ? this.organizationService.update(this.editingOrg.id, { ...this.editingOrg, ...orgData })
      : this.organizationService.create(orgData);

    operation.subscribe({
      next: () => {
        this.showMessage('success', 'Success', 
          `Organization ${this.editingOrg ? 'updated' : 'created'} successfully`);
        this.displayDialog = false;
        this.loadOrganizations();
      },
      error: (err) => {
        this.showMessage('error', 'Error', 
          `Failed to ${this.editingOrg ? 'update' : 'create'} organization`);
        this.isLoading = false;
      }
    });
  }

  confirmDelete(id: number): void {
    this.orgToDelete = id;
    this.showDeleteConfirm = true;
  }

  deleteOrganization(): void {
    if (!this.orgToDelete) return;

    this.isLoading = true;
    this.organizationService.delete(this.orgToDelete).subscribe({
      next: () => {
        this.showMessage('success', 'Success', 'Organization deleted successfully');
        this.showDeleteConfirm = false;
        this.loadOrganizations();
      },
      error: (err) => {
        this.showMessage('error', 'Error', 'Failed to delete organization');
        this.isLoading = false;
      }
    });
  }

  showMessage(severity: string, summary: string, detail: string): void {
    this.messages.push({severity, summary, detail});
    setTimeout(() => this.messages.shift(), 3000);
  }

  closeMessage(index: number): void {
    this.messages.splice(index, 1);
  }
}