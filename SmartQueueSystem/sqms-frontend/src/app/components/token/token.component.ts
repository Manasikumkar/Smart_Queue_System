import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Token, TokenStatus } from '../../models/token.model';
import { TokenService } from '../../services/token.service';
import { ServiceTypeService } from '../../services/service-type.service';
import { ServiceType } from '../../models/service-type.model';

@Component({
  selector: 'app-token',
  templateUrl: './token.component.html',
  styleUrls: [] // Removed CSS file (using Bootstrap utilities)
})
export class TokenComponent implements OnInit {
  tokens: Token[] = [];
  services: ServiceType[] = [];
  statuses = Object.values(TokenStatus);
  tokenForm: FormGroup;
  
  isLoading = false;
  isSubmitting = false;
  currentServingTokens: { [key: number]: Token | null } = {};
  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(
    private tokenService: TokenService,
    private serviceTypeService: ServiceTypeService,
    private fb: FormBuilder
  ) {
    this.tokenForm = this.fb.group({
      tokenNumber: ['', [Validators.required, Validators.pattern(/^T-\d{4}$/)]],
      status: [TokenStatus.WAITING, Validators.required],
      serviceTypeId: ['', Validators.required],
      customerName: [''],
      phoneNumber: ['', [Validators.pattern(/^[0-9]{10}$/)]]
    });
  }

  ngOnInit(): void {
    this.loadInitialData();
  }

  loadInitialData(): void {
    this.isLoading = true;
    this.errorMessage = null;
    
    this.serviceTypeService.getAll().subscribe({
      next: (services) => {
        this.services = services;
        this.loadTokens();
      },
      error: (err) => {
        this.handleError('Failed to load services');
      }
    });
  }

  loadTokens(): void {
    this.tokenService.getAll().subscribe({
      next: (tokens) => {
        this.tokens = tokens;
        this.updateServingTokens();
        this.isLoading = false;
      },
      error: (err) => {
        this.handleError('Failed to load tokens');
      }
    });
  }

  updateServingTokens(): void {
    this.services.forEach(service => {
      this.currentServingTokens[service.id] = this.tokens.find(
        t => t.serviceType.id === service.id && t.status === TokenStatus.SERVING
      ) || null;
    });
  }

  createToken(): void {
    if (this.tokenForm.invalid) {
      this.errorMessage = 'Please fill all required fields correctly';
      return;
    }

    const formValue = this.tokenForm.value;
    const selectedService = this.services.find(s => s.id === +formValue.serviceTypeId);

    if (!selectedService) {
      this.errorMessage = 'Invalid service selected';
      return;
    }

    const newToken: Partial<Token> = {
      tokenNumber: formValue.tokenNumber,
      status: formValue.status,
      serviceType: selectedService,
      customerName: formValue.customerName,
      phoneNumber: formValue.phoneNumber
    };

    this.isSubmitting = true;
    this.errorMessage = null;
    this.successMessage = null;

    this.tokenService.create(newToken).subscribe({
      next: () => {
        this.successMessage = 'Token created successfully!';
        this.tokenForm.reset({ status: TokenStatus.WAITING });
        this.loadTokens();
      },
      error: (err) => {
        this.handleError('Failed to create token');
      },
      complete: () => {
        this.isSubmitting = false;
      }
    });
  }

  updateTokenStatus(token: Token, status: TokenStatus): void {
    if (!token.id) return;

    this.isLoading = true;
    this.errorMessage = null;
    
    this.tokenService.updateStatus(token.id, status).subscribe({
      next: () => {
        this.loadTokens();
      },
      error: (err) => {
        this.handleError('Failed to update token status');
      }
    });
  }

  callNextToken(serviceTypeId: number): void {
    this.isLoading = true;
    this.errorMessage = null;
    
    this.tokenService.getNextToken(serviceTypeId).subscribe({
      next: (token) => {
        if (token.id) {
          this.updateTokenStatus(token, TokenStatus.SERVING);
        } else {
          this.errorMessage = 'No waiting tokens available';
          this.isLoading = false;
        }
      },
      error: (err) => {
        this.handleError('Failed to call next token');
      }
    });
  }

  getStatusBadgeClass(status: TokenStatus): string {
    switch (status) {
      case TokenStatus.WAITING: return 'bg-secondary';
      case TokenStatus.SERVING: return 'bg-primary';
      case TokenStatus.COMPLETED: return 'bg-success';
      case TokenStatus.CANCELLED: return 'bg-danger';
      default: return 'bg-light text-dark';
    }
  }

  private handleError(message: string): void {
    this.errorMessage = message;
    this.isLoading = false;
    this.isSubmitting = false;
  }
}