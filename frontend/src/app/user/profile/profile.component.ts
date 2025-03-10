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
  skillIcon: string = '';
  ageGroup: string = '';
  avatarPath: string = '';

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.userService.getProfile().subscribe({
      next: (profile) => {
        this.user = profile;
        this.setSkillIcon(this.user.skillLevel);
        this.setAgeGroup(this.user.birthDate);
        this.setAvatarPath(this.user.sport);
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

  changePassword() {

  }

  editProfile() {

  }

  showPasses() {
    
  }

  private setSkillIcon(skillLevel: string): void {
    switch (skillLevel) {
      case 'Beginner':
        this.skillIcon = '/icons/gloves.svg';
        break;
      case 'Intermediate':
        this.skillIcon = '/icons/goggles.svg';
        break;
      case 'Advanced':
        this.skillIcon = '/icons/boots.svg';
        break;
    }
  }

  private setAgeGroup(birthdate: Date): void {
    const age = this.calculateAge(birthdate);
    if (age <= 18) {
      this.ageGroup = 'Young';
    } else if (age >= 60) {
      this.ageGroup = 'Elder';
    } else {
      this.ageGroup = 'Adult';
    }
  }

  private setAvatarPath(sport: string): void {
    if (sport == 'Snowboarder') {
      this.avatarPath = 'bear-avatar.png';
    } else if (sport == 'Skier') {
      this.avatarPath = 'pigeon-avatar.png';
    }
  }

  private calculateAge(birthdate: Date): number {
    const birthDate = new Date(birthdate);
    const today = new Date();
  
    let age = today.getFullYear() - birthDate.getFullYear();
    
    const hasBirthdayPassed =
      today.getMonth() > birthDate.getMonth() ||
      (today.getMonth() === birthDate.getMonth() && today.getDate() >= birthDate.getDate());
  
    if (!hasBirthdayPassed) {
      age--;
    }
  
    return age;
  } 
}