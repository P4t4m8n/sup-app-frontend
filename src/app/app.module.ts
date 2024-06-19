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
import { ChatPreviewComponent } from './components/chat/chat-preview/chat-preview.component';
import { ChatListComponent } from './components/chat/chat-list/chat-list.component';
import { HomeComponent } from './pages/home/home.component';
import { NavComponent } from './components/nav/nav.component';
import { CustomDatePipe } from './pipes/custom-date.pipe';
import { AvatarSVG } from './components/svgs/avatar/avatar.component';
import { ChatSVG } from './components/svgs/chat/chat.component';
import { HamburgerSVG } from './components/svgs/hamburger/hamburger.component';
import { SettingsSVG } from './components/svgs/settings/settings.component';
import { ChatFilterComponent } from './components/chat/chat-filter/chat-filter.component';
import { NewMsgSVG } from './components/svgs/new-msg/new-msg.component';
import { FilterSVG } from './components/svgs/filter/filter.component';
import { SendSvg } from './components/svgs/send-svg/send-svg.component';
import { LogoSVG } from './components/svgs/logo/logo.component';
import { GroupSVG } from './components/svgs/group/group.component';
import { NewChatComponent } from './components/chat/new-chat/new-chat.component';
import { ClickOutsideDirective } from './directives/click-outside.directive';
import { AddFriendSVG } from './components/svgs/add-friend/add-friend.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    LoginIndexComponent,
    ModelDirective,
    ClickOutsideDirective,
    ChatComponent,
    ChatPreviewComponent,
    ChatListComponent,
    HomeComponent,
    NavComponent,
    CustomDatePipe,
    ChatFilterComponent,
    NewChatComponent,
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
    NewMsgSVG,
    FilterSVG,
    SendSvg,
    LogoSVG,
    GroupSVG,
    AddFriendSVG,
  ],
  providers: [provideAnimationsAsync()],
  bootstrap: [AppComponent],
})
export class AppModule {}
