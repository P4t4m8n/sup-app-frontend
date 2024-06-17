import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app-root/app.component';
import { AppRoutingModule } from './app.routes';
import { LoginComponent } from './components/login-index/login/login.component';
import { SignupComponent } from './components/login-index/signup/signup.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginIndexComponent } from './components/login-index/login-index.component';
import { ModelDirective } from './directives/model.directive';
import { ChatComponent } from './components/chat/chat.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { LoggingService } from './services/logger/logger.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    LoginIndexComponent,
    ModelDirective,
    ChatComponent,
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [provideAnimationsAsync()],
  bootstrap: [AppComponent],
})
export class AppModule {}
