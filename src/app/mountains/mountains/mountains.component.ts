import { Component, OnInit } from '@angular/core';
import { Mountain } from '../../types/mountain';
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-mountains',
  standalone: true,
  imports: [],
  templateUrl: './mountains.component.html',
  styleUrl: './mountains.component.css'
})
export class MountainsComponent implements OnInit {
  mountains: Mountain[] = [];

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.getMountains().subscribe(mountains => {
      this.mountains = mountains;
    });
  }
}
