import { Component, OnInit, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AuthenticationService } from '../../authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {

  private showSpinner: boolean = false;
  private errorMessage: string = "";
  private isError: boolean = false;

  constructor(private authService: AuthenticationService) { }

  ngOnInit() {
  }

  login (form: NgForm) {
    this.showSpinner = true;
    let email = form.value.email;
    let password = form.value.password;
    this.authService.loginUserWithEmailAndPassword (email, password).then(
      (data)=>{
        this.showSpinner = false;
        this.errorMessage = "";
        this.isError = false;
        this.close(form);
      }
    ).catch(
      (error)=>{
        this.showSpinner = false;
        this.errorMessage = error.message;
        this.isError = true;
      }
    )
  }

  close(form: NgForm) {
    this.showSpinner = false;
    this.authService.showLogin(false);
    this.reset(form);
  }

  reset(form: NgForm) {
    form.onReset();
  }

}
