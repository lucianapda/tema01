import { AuthService } from '../../service/auth/auth.service';

import {Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
/**
 * Created by Guilherme on 03/04/2017.
 */

@Component({
  moduleId: module.id,
  selector: 'login',
  styleUrls: ['./login.component.css'],
  templateUrl: `./login.component.html`,
})
export class LoginComponent implements OnInit {

  public form: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService) {}

  public doLogin(value: any) {
    console.log(value.username);
    console.log(value.password);
    this.authService.login(value.username, value.password).catch((error) => {console.log(error); });
  }

  ngOnInit() {
    this.form = this.fb.group({
      username: new FormControl('', [Validators.compose([Validators.required, Validators.minLength(4)])]),
      password: new FormControl('', [Validators.compose([Validators.required, Validators.minLength(4)])])
    });
  }
}
