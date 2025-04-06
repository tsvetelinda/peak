import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { User } from '../types/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private user$$ = new BehaviorSubject<User | null>(null);
  private user$ = this.user$$.asObservable();

  USER_KEY = '[user]';
  user: User | null = null;

  get isLogged(): boolean {
    return !!this.user;
  }

  constructor(private http: HttpClient) { 
    this.user$.subscribe((user) => this.user = user);
  }

  register(firstName: string, lastName: string, email: string, password: string, birthDate: Date, phone: string, sport: string, skillLevel: string) {
    return this.http.post<User>('/api/users/register', { firstName, lastName, email, password, birthDate, phone, sport, skillLevel })
    .pipe(tap((user) => this.user$$.next(user)));
  }

  login(email: string, password: string) {
    return this.http.post<User>('/api/users/login', { email, password })
    .pipe(tap((user) => this.user$$.next(user)));
  }

  getProfile() {
    return this.http.get<User>('/api/users/profile')
    .pipe(tap((user) => this.user$$.next(user)));
  }

  logout() {
    return this.http.post('/api/users/logout', {})
    .pipe(tap(() => this.user$$.next(null)));
  }

  editProfile(userId: string | undefined, firstName: string, lastName: string, email: string, birthDate: Date, phone: string, sport: string, skillLevel: string) {
    return this.http.put<User>(`/api/users/${userId}`, { firstName, lastName, email, birthDate, phone, sport, skillLevel })
    .pipe(tap((user) => this.user$$.next(user)));
  }

  changePassword(userId: string | undefined, oldPassword: string, newPassword: string) {
    return this.http.patch<User>(`/api/users/${userId}/change-password`, { oldPassword, newPassword })
    .pipe(tap((user) => this.user$$.next(user)));
  }

  buySkiPass(userId: string | undefined, startDate: Date, endDate: Date, mountain: string, priceRate: string) {
    return this.http.post<User>(`/api/users/${userId}/ski-pass`, { startDate, endDate, mountain, priceRate })
    .pipe(tap((user) => this.user$$.next(user)));
  }
}
