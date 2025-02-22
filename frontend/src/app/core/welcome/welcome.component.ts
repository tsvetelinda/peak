import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css'
})
export class WelcomeComponent {
  isHovered = false;
  isTransitioning = false;

  stopAnimationSmoothly() {
    this.isTransitioning = true;

    setTimeout(() => {
      this.isHovered = true;
      this.isTransitioning = false;
    }, 200);
  }
}
