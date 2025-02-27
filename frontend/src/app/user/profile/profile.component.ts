import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../../types/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  user: User | null = null;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.userService.getProfile().subscribe({
      next: (profile) => {
        this.user = profile;
      },
      error: (err) => {
        console.log(err.error.message);
      }
    });
  }

  logout() {
    this.userService.logout().subscribe({
      next: () => {
        this.router.navigate(['/home']);
      },
      error: (err) => {
        console.log(err.error.message);
      }
    });
  }
}