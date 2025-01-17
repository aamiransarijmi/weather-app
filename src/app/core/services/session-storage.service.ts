import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SessionStorageService {
  constructor() {}

  set(key: string, value: any): void {
    sessionStorage.setItem(key, JSON.stringify(value));
  }

  get(key: string): any {
    let value = sessionStorage.getItem(key);
    if (value) {
      value = JSON.parse(value);
    }
    return value;
  }
}
