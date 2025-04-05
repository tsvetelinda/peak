import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../types/user';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-passes',
  standalone: true,
  imports: [DatePipe], 
  templateUrl: './passes.component.html',
  styleUrl: './passes.component.css'
})
export class PassesComponent implements OnInit {
  @Input() user!: User;
  
  ngOnInit(): void {
    this.user.skiPasses.sort((a, b) => {
      const dateA = new Date(a.startDate);
      const dateB = new Date(b.startDate);
  
      return dateB.getTime() - dateA.getTime();
    });
  }

  isExpired(endDate: Date): boolean {
    const today = new Date();
    endDate = new Date(endDate);

    return endDate < today;
  }
}
