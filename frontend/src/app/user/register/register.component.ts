import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  form = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    rePassword: new FormControl('', [Validators.required]),
    birthDate: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
    sport: new FormControl('', [Validators.required]),
    skillLevel: new FormControl('', [Validators.required])
  });

  constructor(private userService: UserService, private router: Router) { }

  register() {
    console.log(this.form.value);

    const { firstName, lastName, email, password, phone, sport, skillLevel } = this.form.value;
    const birthDate = new Date(this.form.value.birthDate!);
    
    this.userService.register(firstName!, lastName!, email!, password!, birthDate!, phone!, sport!, skillLevel!).subscribe({
      next: () => {
        this.router.navigate(['home']);
      },
      error: (err) => {
        this.form.reset();
      }
    });
  }
}
