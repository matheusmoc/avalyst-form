import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { ReturnMessage } from '../models/return-message';
import { Contact } from '../models/contact';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  apiUrl: string;

  constructor(private http: HttpClient) {
    this.apiUrl = environment.apiUrl + 'contact';
  }

  get(id: number): Observable<ReturnMessage<Contact>>  {
    return this.http.get<ReturnMessage<Contact>>(`${this.apiUrl}/${id}`);
  }

  list(): Observable<ReturnMessage<Contact[]>>  {
    return this.http.get<ReturnMessage<Contact[]>>(this.apiUrl);
  }

  create(model: Contact): Observable<ReturnMessage<Contact>> {
    return this.http.post<ReturnMessage<Contact>>(this.apiUrl, model);
  }

  update(id: number, model: Contact): Observable<ReturnMessage<Contact>> {
    return this.http.put<ReturnMessage<Contact>>(`${this.apiUrl}/${id}`, model);
  }

  search(term: string): Observable<ReturnMessage<Contact[]>> {
    return this.http.post<ReturnMessage<Contact[]>>(this.apiUrl + '/search', { query: term });
  }
}
