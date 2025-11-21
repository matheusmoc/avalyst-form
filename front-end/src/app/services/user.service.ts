import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ReturnMessage } from '../models/return-message';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl: string;

  constructor(private http: HttpClient) {
    this.apiUrl = environment.apiUrl + 'user';
  }

  list(): Observable<ReturnMessage<User[]>> {
    return this.http.get<ReturnMessage<User[]>>(this.apiUrl);
  }

  create(model: User): Observable<ReturnMessage<User>> {
    return this.http.post<ReturnMessage<User>>(this.apiUrl, model);
  }
}
