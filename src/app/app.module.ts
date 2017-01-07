import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AngularFireModule} from 'angularfire2/index';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { MedecineService } from './medecine.service';
import { firebaseConfig } from '../environments/firebase.config';
import { HeaderComponent } from './header/header.component';
import { MedecineInfoComponent } from './medecine-info/medecine-info.component';
import { SearchComponent } from './medecine-info/search/search.component';
import { DetailsComponent } from './medecine-info/details/details.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { AuthenticationService } from './authentication.service';
import { LoginComponent } from './authentication/login/login.component';
import { SignupComponent } from './authentication/signup/signup.component';
import { appRoutes } from './app.routes';
import { OrdersComponent } from './orders/orders.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MedecineInfoComponent,
    SearchComponent,
    DetailsComponent,
    AuthenticationComponent,
    LoginComponent,
    SignupComponent,
    OrdersComponent
    ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  providers: [MedecineService, AuthenticationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
