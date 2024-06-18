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
import { ChatComponent } from './components/chat/chat-screen/chat.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { LoggingService } from './services/logger/logger.service';
import { ChatPreviewComponent } from './components/chat/chat-preview/chat-preview.component';
import { ChatListComponent } from './components/chat/chat-list/chat-list.component';
import { HomeComponent } from './pages/home/home.component';
import { NavComponent } from './components/nav/nav.component';
import { ChatListHeaderComponent } from './components/chat/chat-list-header/chat-list-header.component';
import { CustomDatePipe } from './pipes/custom-date.pipe';
import { AvatarSVG } from './components/svgs/avatar/avatar.component';
import { ChatSVG } from './components/svgs/chat/chat.component';
import { HamburgerSVG } from './components/svgs/hamburger/hamburger.component';
import { SettingsSVG } from './components/svgs/settings/settings.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    LoginIndexComponent,
    ModelDirective,
    ChatComponent,
    ChatPreviewComponent,
    ChatListComponent,
    HomeComponent,
    NavComponent,
    ChatListHeaderComponent,
    CustomDatePipe,
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AvatarSVG,
    ChatSVG,
    HamburgerSVG,
    SettingsSVG,
  ],
  providers: [provideAnimationsAsync()],
  bootstrap: [AppComponent],
})
export class AppModule {}
