import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MessagesService } from '../messages.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-message-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonModule, InputTextModule, InputTextareaModule],
  templateUrl: './message-form.component.html',
  styleUrls: ['./message-form.component.scss']
})
export class MessageFormComponent {
  @Output() messageCreated = new EventEmitter<void>();
  
  messageForm: FormGroup;
  submitting = false;

  constructor(
    private fb: FormBuilder,
    private messagesService: MessagesService,
    private messageService: MessageService
  ) {
    this.messageForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(100)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(100)]],
      message: ['', [Validators.required, Validators.maxLength(500)]]
    });
  }

  onSubmit() {
    if (this.messageForm.valid) {
      this.submitting = true;
      
      this.messagesService.createMessage(this.messageForm.value).subscribe({
        next: () => {
          this.messageForm.reset();
          this.submitting = false;
          this.messageCreated.emit();
        },
        error: (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: error.error?.message || 'Failed to create message'
          });
          this.submitting = false;
        }
      });
    } else {
      Object.keys(this.messageForm.controls).forEach(key => {
        const control = this.messageForm.get(key);
        if (control && control.invalid) {
          control.markAsTouched();
        }
      });
    }
  }

  get f() {
    return this.messageForm.controls;
  }
}