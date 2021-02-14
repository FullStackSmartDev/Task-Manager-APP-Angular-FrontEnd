import { Component, OnInit } from '@angular/core';
import {HttpResponse} from '@angular/common/http';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.scss']
})
export class SignupPageComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  onSignupButtonClicked(email: string, password: string): void {
    this.authService.signup(email, password).subscribe((res: HttpResponse<any>) => {
      console.log(res);
    });
  }

}
