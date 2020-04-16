import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserMenuComponent } from './lib/user-menu/user-menu.component';
import {MatDividerModule} from '@angular/material/divider';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {UserService} from './lib/user.service';
import { SignInButtonComponent } from './lib/sign-in-button/sign-in-button.component';



@NgModule({
  declarations: [UserMenuComponent, SignInButtonComponent],
  exports: [UserMenuComponent, SignInButtonComponent],
  imports: [
    CommonModule,
    MatDividerModule,
    MatMenuModule,
    MatButtonModule
  ],
  providers: [
    UserService
  ],
})
export class AuthModule { }
