import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface UserMessage {
  id: number;
  name: string;
  email: string;
  message: string;
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedResponse {
  data: UserMessage[];
  total: number;
  page: number;
  limit: number;
}

export interface CreateMessageDto {
  name: string;
  email: string;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  private apiUrl = '/api/messages';

  constructor(private http: HttpClient) {}

  getMessages(page: number = 1, limit: number = 3): Observable<PaginatedResponse> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());

    return this.http.get<PaginatedResponse>(this.apiUrl, { params });
  }

  createMessage(message: CreateMessageDto): Observable<UserMessage> {
    return this.http.post<UserMessage>(this.apiUrl, message);
  }
}