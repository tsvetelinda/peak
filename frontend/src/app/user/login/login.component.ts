import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  submitted: boolean = false;
  errorMsg: string | null = null;

  form = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });

  constructor(private userService: UserService, private router: Router) { }

  login() {
    if (this.form.invalid) {
      this.submitted = true;
      return;
    }

    const { email, password } = this.form.value;

    this.userService.login(email!, password!).subscribe({
      next: () => {
        this.router.navigate(['home']);
      },
      error: (err) => {
        this.form.reset();
        this.errorMsg = err.error.message;
      }
    });
  }

  isFieldEmpty(controlName: string) {
    return this.form.get(controlName)?.touched && this.form.get(controlName)?.errors?.['required'];
  }
}
