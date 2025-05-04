import { Component, OnInit } from '@angular/core';
import { Token, TokenStatus } from '../../models/token.model';
import { TokenService } from '../../services/token.service';
import { ServiceTypeService } from '../../services/service-type.service';
import { ServiceType } from '../../models/service-type.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-token',
  templateUrl: './token.component.html',
  styleUrls: ['./token.component.css']
})
export class TokenComponent implements OnInit {
  tokens: Token[] = [];
  services: ServiceType[] = [];
  statuses: TokenStatus[] = [TokenStatus.WAITING, TokenStatus.SERVING, TokenStatus.COMPLETED, TokenStatus.CANCELLED];
  tokenForm: FormGroup;
  isLoading = false;

  constructor(
    private tokenService: TokenService,
    private serviceTypeService: ServiceTypeService,
    private fb: FormBuilder
  ) {
    this.tokenForm = this.fb.group({
      tokenNumber: ['', [Validators.required, Validators.pattern(/^T-\d{4}$/)]],
      status: [TokenStatus.WAITING, Validators.required],
      serviceTypeId: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadTokens();
    this.loadServices();
  }

  loadTokens(): void {
    this.isLoading = true;
    this.tokenService.getAll().subscribe({
      next: (data) => {
        this.tokens = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading tokens', err);
        this.isLoading = false;
      }
    });
  }

  loadServices(): void {
    this.serviceTypeService.getAll().subscribe({
      next: (data) => this.services = data,
      error: (err) => console.error('Error loading services', err)
    });
  }

  createToken(): void {
    if (this.tokenForm.invalid) return;

    const formValue = this.tokenForm.value;
    const selectedService = this.services.find(s => s.id === +formValue.serviceTypeId);

    if (!selectedService) return;

    const newToken: Partial<Token> = {
      tokenNumber: formValue.tokenNumber,
      status: formValue.status,
      serviceType: selectedService
    };

    this.isLoading = true;
    this.tokenService.create(newToken).subscribe({
      next: () => {
        this.tokenForm.reset({ status: TokenStatus.WAITING });
        this.loadTokens();
      },
      error: (err) => {
        console.error('Error creating token', err);
        this.isLoading = false;
      }
    });
  }

  updateTokenStatus(token: Token, status: TokenStatus): void {
    if (!token.id) return;

    this.isLoading = true;
    this.tokenService.updateStatus(token.id, status).subscribe({
      next: () => this.loadTokens(),
      error: (err) => {
        console.error('Error updating token status', err);
        this.isLoading = false;
      }
    });
  }

  callNextToken(serviceTypeId: number): void {
    this.isLoading = true;
    this.tokenService.getNextToken(serviceTypeId).subscribe({
      next: (token) => {
        if (token.id) {
          this.updateTokenStatus(token, TokenStatus.SERVING);
        }
      },
      error: (err) => {
        console.error('Error calling next token', err);
        this.isLoading = false;
      }
    });
  }
}
