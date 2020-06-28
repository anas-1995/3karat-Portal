import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {
  isLogIn;
  userId;
  token;
  userName
  lang
  role
  email
  centerId
  constructor(private router: Router) {
    if (localStorage.getItem('token')) {
      this.isLogIn = true
      this.init();
    }
    else {
      this.isLogIn = false;
    }
  }
  init() {
    this.userId = localStorage.getItem("userId");
    this.token = localStorage.getItem("token");
    this.userName = localStorage.getItem("userName");
    // this.role = localStorage.getItem("role");
    // this.lang = localStorage.getItem("lang");
    // this.centerId = localStorage.getItem("centerId");
  }

  isLogin() {
    return this.isLogIn;
  }

  getUserId() {
    return this.userId;
  }

  getToken() {
    return this.token;
  }

  getCenterId() {
    return this.centerId
  }
  getuserName() {
    return this.userName;
  }
  getEmail() {
    return this.email
  }

  getRole() {
    return this.role;
  }

  getLang() {
    return this.lang;
  }

  setLang(lang) {
    this.lang = lang;
    localStorage.setItem('lang', lang);
  }

  logIn(data) {
    this.isLogIn = true;
    this.logInLocalStorage(data);
    this.init();
  }

  logout() {
    this.logoutLocalStorage();
    this.router.navigateByUrl('/login')
  }

  logInLocalStorage(data) {
    localStorage.setItem('userId', data.userId);
    localStorage.setItem('token', data.id);
    localStorage.setItem('userName', data.user.username);
    // localStorage.setItem('email', data.user.email);
    // localStorage.setItem('role', data.user.groups[0].name);
    // if (data.user.center)
    //   localStorage.setItem('centerId', data.user.center.id);

    // this.router.navigateByUrl('/').then(() => this.router.navigateByUrl('/'));
  }



  logoutLocalStorage() {
    localStorage.clear();
  }

}
