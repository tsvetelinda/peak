import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HeaderComponent } from '../core/header/header.component';
import { MountainsComponent } from '../mountains/mountains/mountains.component';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';

@Component({ 
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, MountainsComponent, RouterOutlet],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'  
})
export class HomeComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const fragment = this.route.snapshot.fragment;
        if (fragment) {
          this.scrollToElement(fragment);
        }
      }
    });
  }

  private scrollToElement(fragment: string): void {
    const element = document.getElementById(fragment);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
