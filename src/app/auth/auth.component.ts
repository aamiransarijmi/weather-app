import { Component, OnInit } from '@angular/core';
import { SessionStorageService } from '../core/services/session-storage.service';
import { LOGIN_RESPONSE, USER_RESPONSE } from '../core/const/loginResponse';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  constructor(private sessionService: SessionStorageService) {}

  ngOnInit() {
    const isUsers = this.sessionService.get('users');
    if (!isUsers) {
      const users = USER_RESPONSE;
      this.sessionService.set('users', users);
      this.sessionService.set('temperatureType', true);
    }
  }
}
