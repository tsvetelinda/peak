import { Component, Input } from '@angular/core';
import { User } from '../../types/user';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-passes',
  standalone: true,
  imports: [DatePipe], 
  templateUrl: './passes.component.html',
  styleUrl: './passes.component.css'
})
export class PassesComponent {
  @Input() user!: User;

  isExpired(endDate: Date): boolean {
    const today = new Date();
    endDate = new Date(endDate);

    return endDate < today;
  }
}
