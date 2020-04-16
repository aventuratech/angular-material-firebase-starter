import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UserService} from '../user.service';
import {Router} from '@angular/router';

export const SIGN_IN_PROVIDER_GOOGLE = 'GOOGLE';

@Component({
  selector: 'app-sign-in-button',
  templateUrl: './sign-in-button.component.html',
  styleUrls: ['./sign-in-button.component.scss']
})
export class SignInButtonComponent implements OnInit {
  // this is the only supported provider at this point
  @Input() provider = SIGN_IN_PROVIDER_GOOGLE;

  // path to redirect to on successfull sign in
  @Input() redirect: string;

  // emits the user after successfull signin
  @Output() connected: EventEmitter<any> = new EventEmitter<any>();

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit(): void {
  }

  signIn() {
    switch (this.provider) {
      case SIGN_IN_PROVIDER_GOOGLE:
        this.userService.googleSignIn(true).subscribe(user => {
          this.connected.emit(user);
          if (this.redirect) {
            this.router.navigateByUrl(this.redirect);
          }
        }, e => console.log(e));
        break;
      default:
        console.error('Unknown auth provider: ' + this.provider);
    }

  }
}
