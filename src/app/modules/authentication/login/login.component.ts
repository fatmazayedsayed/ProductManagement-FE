import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  Form,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ControlingFormsService } from 'src/app/services/controling-forms.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class AppSideLoginComponent implements OnInit {
  loginForm!: FormGroup;
  hide = true;
  isErr: boolean = false;
  errContent!: string;
  constructor(
    private router: Router,
    private markFormsAsTouched: ControlingFormsService,
    private authService: AuthService
  ) {}
  ngOnInit() {
    localStorage.removeItem('userData');
    this.createForm();
  }

  createForm() {
    this.loginForm = new FormGroup({
      userName: new FormControl('', [
        Validators.required,
       ]),
      password: new FormControl('', Validators.required),
    });
  }
  get C(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }

  login() {
    this.markFormsAsTouched.markFormGroupTouched(this.loginForm);
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe(
        (res: any) => {
          if (res.isSuccess) {
            localStorage.setItem('userData', JSON.stringify(res));

            this.router.navigate(['/home']);
          } else {
            this.isErr = true;
          }
        },
        (err: any) => {
          this.isErr = true;
          // this.errContent = err.error.Message;
        }
      );
    }
  }
}
