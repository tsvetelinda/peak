import { Component } from '@angular/core';
import { WelcomeComponent } from '../core/welcome/welcome.component';
import { ProfileComponent } from '../user/profile/profile.component';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-view-switcher',
  standalone: true,
  imports: [WelcomeComponent, ProfileComponent],
  templateUrl: './view-switcher.component.html',
  styleUrl: './view-switcher.component.css'
})
export class ViewSwitcherComponent {
  constructor(private userService: UserService) { }

  get isLoggedIn() : boolean {
    return this.userService.isLogged;
  }  
}
