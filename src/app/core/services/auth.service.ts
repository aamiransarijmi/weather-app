import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, of } from 'rxjs';
import { LOGIN_RESPONSE, USER_RESPONSE } from '../const/loginResponse';
import { REGISTER_RESPONSE } from '../const/registerResponse';
import { SessionStorageService } from './session-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isLoginSubject = new BehaviorSubject<boolean>(
    !!sessionStorage.getItem('token')
  );
  public isLogin$ = this.isLoginSubject.asObservable();

  constructor(private sessionService: SessionStorageService) {}

  public async isLoggedIn() {
    try {
      if (sessionStorage.getItem('token')) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  }

  public login(
    email: string,
    password: string
  ): Observable<{ success: boolean; message: string; token?: string }> {
    const users = this.sessionService.get('users');

    const loginData = users.find(
      (user) => user.email === email && user.password === password
    );

    if (loginData) {
      return of({
        success: true,
        message: LOGIN_RESPONSE.message,
        token: this.randomString(),
      });
    } else {
      return of({
        success: false,
        message: 'Invalid email or password.',
      });
    }
  }

  public register(payload) {
    const isUser = this.sessionService.get('users');
    let users = [];
    if (isUser) {
      users = isUser;
    } else {
      users = USER_RESPONSE;
    }
    users.push(payload);
    this.sessionService.set('users', users);
    return { ...REGISTER_RESPONSE, token: this.randomString() };
  }

  public logout() {
    sessionStorage.clear();
  }

  public setLoginStatus(status: boolean, tokon?) {
    this.isLoginSubject.next(status);
    if (status) {
      sessionStorage.setItem('token', tokon);
    } else {
      sessionStorage.clear();
    }
  }

  // public getLoginStatus(): boolean {
  //   return this.isLoginSubject.value;
  // }

  public randomString(): string {
    let randomChars: string =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result: string = '';
    for (let i = 0; i < 18; i++) {
      result += randomChars.charAt(
        Math.floor(Math.random() * randomChars.length)
      );
    }
    return result;
  }
}
