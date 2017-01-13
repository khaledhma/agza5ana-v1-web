import { Component, OnInit, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AuthenticationService } from '../../authentication.service';
import { UserService } from '../../user.service';
import { User } from '../../user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {

  private showSpinner: boolean = false;
  private errorMessage: string = "";
  private isError: boolean = false;

  constructor(private authService: AuthenticationService, private userService: UserService) { }

  ngOnInit() {
  }

  login (form: NgForm) {
    this.showSpinner = true;
    let email = form.value.email;
    let password = form.value.password;
    this.authService.loginUserWithEmailAndPassword (email, password).then(
      (user)=>{
        this.showSpinner = false;
        this.errorMessage = "";
        this.isError = false;
        this.userService.getUserProfile(user.uid).subscribe(
          (userData) => {
            userData.hasOwnProperty('displayName')?console.log('yes'):console.log('no');
            if (!userData.hasOwnProperty('displayName')) {
              let userNewData = new User(user.auth.displayName,"",user.uid);
              this.userService.updateUserProfile(userNewData).then(()=>console.log('update success'));
            }
          },
          (error) => {
            console.log(error)
          }
        );
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
