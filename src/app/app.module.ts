import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import { NgxCaptchaModule } from 'ngx-captcha';
import { AuthModule } from './components/auth/auth.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/common/header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { TokenInterceptor } from './core/interceptors/token.interceptor';
import { RolesInterceptor } from './core/interceptors/roles.interceptor';
import { HomeComponent } from './components/common/home/home.component';
import { environment } from '../environments/environment';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    BrowserModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AuthModule,
    NgxCaptchaModule.forRoot({
      reCaptcha2SiteKey: '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI',
    }),
  ],
  providers: [    
    AngularFirestore,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RolesInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent],
})

export class AppModule { }
