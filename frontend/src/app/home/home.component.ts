import { Component } from '@angular/core';
import { HeaderComponent } from '../core/header/header.component';
import { MountainsComponent } from '../mountains/mountains/mountains.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, MountainsComponent, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css' 
})
export class HomeComponent {

}
