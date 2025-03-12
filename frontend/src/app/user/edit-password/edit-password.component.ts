import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { User } from '../../types/user';

@Component({
  selector: 'app-edit-password',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './edit-password.component.html',
  styleUrl: './edit-password.component.css'
})
export class EditPasswordComponent {
  @Input() user!: User;
  @Output() cancel = new EventEmitter<void>();
  @Output() passwordUpdated = new EventEmitter<void>();
  
  submitted: boolean = false;
  errorMsg: string | null = null;
  
  form = new FormGroup({
    currentPassword: new FormControl('', [Validators.required]),
    newPassword: new FormControl('', [Validators.required]),
    reNewPassword: new FormControl('', [Validators.required])
  });

  constructor(private userService: UserService) { }

  submitPassword(event: Event) {
    event.preventDefault();

    const { currentPassword, newPassword, reNewPassword } = this.form.value;

    if (newPassword !== reNewPassword) {
      this.errorMsg = 'Паролите не съответстват!';
      return;
    }

    this.userService.changePassword(this.user._id, currentPassword!, newPassword!).subscribe({
      next: () => {
        this.form.reset();
        this.passwordUpdated.emit();
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
}
