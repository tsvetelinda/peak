import { Component, OnInit } from '@angular/core';
import { Mountain } from '../../types/mountain';
import { ApiService } from '../../api.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { RouterLink } from '@angular/router';
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
        }),
      ),
      state(
        'closed',
        style({
          opacity: 0,
        }),
      ),
      transition('open => closed', [animate('1s')]),
      transition('closed => open', [animate('0.5s')]),
    ]),
  ]
})
export class MountainsComponent implements OnInit {
  isLoading = true;
  user: User | null = null;

  mountains: Mountain[] = [];
  slopesVisible: boolean = false;
  restaurantsVisible: boolean = false;

  form = new FormGroup({
    startDate: new FormControl('', [Validators.required]),
    endDate: new FormControl('', [Validators.required])
  });

  constructor(private apiService: ApiService, private userService: UserService) { }

  ngOnInit(): void {
    this.apiService.getMountains().subscribe(mountains => {
      this.mountains = mountains;
      this.mountains.forEach(mountain => {
        mountain.restaurantsVisible = false;
        mountain.slopesVisible = false;
        mountain.hotelsVisible = false;
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

  onSubmit() {
    const startDate = new Date(this.form.value.startDate!);
    const endDate = new Date(this.form.value.endDate!);

    /* Validation for start date being after end date
    if (newPassword !== reNewPassword) {
      this.errorMsg = 'Паролите не съответстват!';
      return;
    }*/

    this.userService.buySkiPass(this.user?._id, startDate!, endDate!).subscribe({
      next: () => {
        this.form.reset();
      },
      error: () => {
        this.form.reset();
      }
    });
  }

  toggleRestaurantsVisibility(index: number) {
    this.mountains[index].restaurantsVisible = !this.mountains[index].restaurantsVisible;
  }

  toggleSlopesVisibility(index: number) {
    this.mountains[index].slopesVisible = !this.mountains[index].slopesVisible;
  }

  toggleHotelsVisibility(index: number) {
    this.mountains[index].hotelsVisible = !this.mountains[index].hotelsVisible;
  }

  toggleParkingVisibility(index: number) {
    this.mountains[index].parkingVisible = !this.mountains[index].parkingVisible;
  }
}
