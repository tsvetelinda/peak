import { Component } from '@angular/core';
import { HeaderComponent } from '../core/header/header.component';
import { MountainsComponent } from '../mountains/mountains/mountains.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, MountainsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css' 
})
export class HomeComponent {

}
