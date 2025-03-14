import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProfileDetails, User } from '../../types/user';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../user.service';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.css'
})
export class EditProfileComponent implements OnInit {
  @Input() user!: User;
  @Output() cancel = new EventEmitter<void>();
  @Output() profileUpdated = new EventEmitter<User>();

  submitted: boolean = false;
  errorMsg: string | null = null;

  profileDetails: ProfileDetails = {
    firstName: '',
    lastName: '',
    email: '',
    birthDate: '',
    phone: '',
    sport: '',
    skillLevel: '',
  };

  form = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    birthDate: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
    sport: new FormControl('', [Validators.required]),
    skillLevel: new FormControl('', [Validators.required])
  });

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    if (this.user) {
      this.profileDetails = { 
        firstName: this.user.firstName,
        lastName: this.user.lastName,
        email: this.user.email,
        birthDate: this.formatDate(this.user.birthDate),
        phone: this.user.phone,
        sport: this.user.sport,
        skillLevel: this.user.skillLevel,
      }
    }

    this.form.setValue({
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      email: this.user.email,
      birthDate: this.formatDate(this.user.birthDate),
      phone: this.user.phone,
      sport: this.user.sport,
      skillLevel: this.user.skillLevel,
    });
  }

  submitProfile(event: Event) {
    event.preventDefault();

    const { firstName, lastName, email, phone, sport, skillLevel } = this.form.value;
    const birthDate = new Date(this.form.value.birthDate!);

    this.userService.editProfile(this.user._id, firstName!, lastName!, email!, birthDate!, phone!, sport!, skillLevel!).subscribe({
      next: (updatedUser) => {
        this.form.reset();
        this.profileUpdated.emit(updatedUser);
      },
      error: (err) => {
        this.form.reset();
        this.errorMsg = err.error.message;
      }
    });
  }

  cancelEdit() {
    this.cancel.emit();
  }

  isFieldEmpty(controlName: string) {
    return this.form.get(controlName)?.touched && this.form.get(controlName)?.errors?.['required'];
  }

  private formatDate(date: Date): string {
    return date ? new Date(date).toISOString().split('T')[0] : '';
  }
}
