import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../user.service';

@Component({
  selector: 'app-edit-password',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './edit-password.component.html',
  styleUrl: './edit-password.component.css'
})
export class EditPasswordComponent {
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
    event.preventDefault(); // Prevent form refresh

    /*
    if (this.newPassword !== this.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }*/

    alert('Password updated successfully!');
    this.passwordUpdated.emit(); // Notify the parent component
  }

  cancelEdit() {
    this.cancel.emit();
  }

  isFieldEmpty(controlName: string) {
    return this.form.get(controlName)?.touched && this.form.get(controlName)?.errors?.['required'];
  }
}
