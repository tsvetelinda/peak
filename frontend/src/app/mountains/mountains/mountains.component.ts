import { Component, OnInit } from '@angular/core';
import { Mountain } from '../../types/mountain';
import { ApiService } from '../../api.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Router, RouterLink } from '@angular/router';
import { LoaderComponent } from '../../core/loader/loader.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../user/user.service';
import { User } from '../../types/user';

@Component({
  selector: 'app-mountains',
  standalone: true, 
  imports: [RouterLink, LoaderComponent, ReactiveFormsModule], 
  templateUrl: './mountains.component.html',
  styleUrl: './mountains.component.css',
  animations: [
    trigger('openClose', [
      state(
        'open',
        style({
          opacity: 1,
          pointerEvents: 'auto',
        }),
      ),
      state(
        'closed',
        style({
          opacity: 0,
          pointerEvents: 'none',
        }),
      ),
      transition('open => closed', [animate('1s')]),
      transition('closed => open', [animate('0.5s')]),
    ]),
  ]
})
export class MountainsComponent implements OnInit {
  isLoading = true;
  errorMsg: string | null = null;
  submitted: boolean = false;
  user: User | null = null;

  mountains: Mountain[] = [];

  showForm: boolean = false;

  form = new FormGroup({
    startDate: new FormControl('', [Validators.required]),
    endDate: new FormControl('', [Validators.required])
  });

  constructor(private apiService: ApiService, private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.apiService.getMountains().subscribe(mountains => {
      this.mountains = mountains;
      this.mountains.forEach(mountain => {
        mountain.restaurantsVisible = false; 
        mountain.slopesVisible = false;
        mountain.accomodationVisible = false;
        mountain.parkingVisible = false; 
      });
      this.isLoading = false;
    });

    this.userService.getProfile().subscribe({
      next: (profile) => {
        this.user = profile;
      },
      error: (err) => {
        console.log(err.error.message);
      }
    });
  }

  navigateAndScroll(route: string) {
    this.router.navigate([route]).then(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  onSubmit(mountainName: string) {
    if (this.form.invalid) {
      this.submitted = true;
      return;
    }

    const startDate = new Date(this.form.value.startDate!);
    const endDate = new Date(this.form.value.endDate!);
    const priceRate = this.setPriceRate();

    if (endDate < startDate) {
      this.errorMsg = 'Началната дата не може да бъде след крайната!';
      return;
    }

    this.userService.buySkiPass(this.user?._id, startDate!, endDate!, mountainName!, priceRate!).subscribe({
      next: () => {
        this.form.reset();
        this.showForm = false;
      },
      error: () => {
        this.form.reset();
      }
    });
  }

  toggleForm() {
    this.showForm = !this.showForm;
  }

  toggleRestaurantsVisibility(index: number) {
    console.log('Before: ' + this.mountains[index].restaurantsVisible);
    this.mountains[index].restaurantsVisible = !this.mountains[index].restaurantsVisible;
    console.log('After: ' + this.mountains[index].restaurantsVisible);
  }

  toggleSlopesVisibility(index: number) {
    this.mountains[index].slopesVisible = !this.mountains[index].slopesVisible;
  }

  toggleAccomodationVisibility(index: number) {
    this.mountains[index].accomodationVisible = !this.mountains[index].accomodationVisible;
  }

  toggleParkingVisibility(index: number) {
    this.mountains[index].parkingVisible = !this.mountains[index].parkingVisible;
  }

  setMountainIcon(mountainName: string): string {
    switch (mountainName) {
      case 'vitosha':
        return 'icons/vitosha-icon.svg';
      case 'rila':
        return 'icons/rila-icon.svg';
      case 'pirin':
        return 'icons/pirin-icon.svg';
      case 'rodopi':
       return 'icons/rodopi-icon.svg';
      default: return '';
    }
  }

  setPriceRate() {
    const age = this.calculateAge(this.user?.birthDate);
    if (age <= 18) {
      return 'Young';
    } else if (age >= 60) {
      return 'Elder';
    } else {
      return 'Adult';
    }
  }

  private calculateAge(birthdate: Date | undefined): number {
    if (birthdate == undefined) {
      return 0;
    }
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

  isFieldEmpty(controlName: string) {
    return this.form.get(controlName)?.touched && this.form.get(controlName)?.errors?.['required'];
  }
}
