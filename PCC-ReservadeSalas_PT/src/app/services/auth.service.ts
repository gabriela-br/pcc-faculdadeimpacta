import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppConfig } from '../shared/config';
import { User } from '../shared/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl =  `${AppConfig.apiUrl}/auth`;

  constructor(private http: HttpClient) {}

  login(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/login`, user);
  }

  register(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/register`, user);
  }
}
