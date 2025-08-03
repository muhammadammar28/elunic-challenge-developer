import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { MessagesService, UserMessage } from './messages.service';
import { MessageService } from 'primeng/api';
import { MessageFormComponent } from './message-form/message-form.component';

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [CommonModule, TableModule, CardModule, ToastModule, MessageFormComponent],
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
  providers: [MessageService]
})
export class MessagesComponent implements OnInit {
  messages: UserMessage[] = [];
  totalRecords = 0;
  loading = false;
  rows = 3;
  first = 0;

  constructor(
    private messagesService: MessagesService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.loadMessages();
  }

  loadMessages(event?: any) {
    this.loading = true;
    const page = event ? (event.first / event.rows) + 1 : 1;
    
    this.messagesService.getMessages(page, this.rows).subscribe({
      next: (response) => {
        this.messages = response.data;
        this.totalRecords = response.total;
        this.loading = false;
        this.first = event ? event.first : 0;
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to load messages'
        });
        this.loading = false;
      }
    });
  }

  onMessageCreated() {
    this.first = 0;
    this.loadMessages();
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Message created successfully'
    });
  }
}