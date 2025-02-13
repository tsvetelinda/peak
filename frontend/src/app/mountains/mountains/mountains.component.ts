import { Component, OnInit } from '@angular/core';
import { Mountain } from '../../types/mountain';
import { ApiService } from '../../api.service';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-mountains',
  standalone: true,
  imports: [],
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
  mountains: Mountain[] = [];
  slopesVisible: boolean = false;
  restaurantsVisible: boolean = false;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.getMountains().subscribe(mountains => {
      this.mountains = mountains;
      this.mountains.forEach(mountain => {
        mountain.restaurantsVisible = false;
        mountain.slopesVisible = false;
        mountain.hotelsVisible = false;
        mountain.parkingVisible = false;
      });
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
