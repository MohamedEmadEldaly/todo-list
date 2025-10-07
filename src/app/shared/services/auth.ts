import { HttpClient } from '@angular/common/http';
import { computed, effect, Injectable, signal } from '@angular/core';
import { TokenResponse } from '../models/token.model';
import { endpointApi } from '../enums/endpoints.enum';
import { Observable, tap } from 'rxjs';
import { loginResponse, userModel } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // signals
  accessToken = signal<string | null | undefined>(sessionStorage.getItem('access_token'));
  refreshToken = signal<string | null | undefined>(sessionStorage.getItem('refresh_token'));
  user = signal<loginResponse>(JSON.parse(<string>sessionStorage.getItem('user')));


  // Derived signal to check login status
  isAuthenticated = computed(() => !!this.accessToken());

  constructor(private http: HttpClient) {
    effect(() => {
      const access = this.accessToken();
      const refresh = this.refreshToken();
      const user = this.user();
      if (access) sessionStorage.setItem('access_token', access);
      else sessionStorage.removeItem('access_token');
      if (refresh) sessionStorage.setItem('refresh_token', refresh);
      else sessionStorage.removeItem('refresh_token');
      if(user) sessionStorage.setItem('user', JSON.stringify(user))
    });
  }

  login(user: userModel): Observable<loginResponse> {
    return this.http.post(`${endpointApi.auth}/login`, { ...user, expiresInMins: 10 })
    .pipe(
      tap((response: loginResponse) => {
        this.accessToken.set(response.accessToken);
        this.refreshToken.set(response.refreshToken);
        this.user.set(response)
      })
    );
  }

  refreshTokens() {
    return this.http
      .post<TokenResponse>(`${endpointApi.auth}/refresh`, {
        refreshToken: this.refreshToken(),
      })
      .pipe(
        tap((response: TokenResponse) => {
          this.accessToken.set(response.accessToken);
          this.refreshToken.set(response.refreshToken);
        })
      );
  }

  clearTokens() {
    this.accessToken.set(null);
    this.refreshToken.set(null);
  }

  logout() {
    this.accessToken.set(null);
    this.refreshToken.set(null);
  }
}
