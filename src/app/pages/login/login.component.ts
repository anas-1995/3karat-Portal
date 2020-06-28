import { MainService } from './../../service/main.service';
import { LoginService } from './login.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { appError } from '../../models/app-error.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class loginComponent implements OnInit {
  public isSubmitted: boolean = false
  public message: string = "";

  logInForm = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", Validators.required)
  });

  constructor(private loginSer: LoginService, private mainSer: MainService) { }

  ngOnInit() {
  }

  submitLogin() {
    var self = this;
    if (this.logInForm.valid == false) {
      this.isSubmitted = true;
      return
    }

    this.loginSer.login(this.logInForm.value, function (err: appError, data) {
      if (err) {
        self.message = "ERROR_FORM.LOGIN_FIELD";
        // self.message = err.returnMessage();
        return;
      }
      self.mainSer.authServ.logIn(data);
      self.mainSer.globalServ.goTo('list-royalty')
    })
  }
}
