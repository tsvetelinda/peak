import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  form = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });

  constructor(private userService: UserService, private router: Router) { }

  login() {
    const { email, password } = this.form.value;

    this.userService.login(email!, password!).subscribe({
      next: () => {
        this.router.navigate(['home']);
      },
      error: () => {
        this.form.reset();
      }
    });
  }
}
