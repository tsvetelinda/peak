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

  setPriceRate(priceRate: string): string {
    switch (priceRate) {
      case 'Young': return 'Непълнолетен';
      case 'Adult': return 'Възрастен';
      case 'Elder': return 'Пенсионер';
      default: return '';
    }
  }

  setMountainName(mountain: string): string {
    switch (mountain) {
      case 'vitosha': return 'Витоша';
      case 'rila': return 'Рила';
      case 'pirin': return 'Пирин';
      case 'rodopi': return 'Родопи';
      default: return '';
    }
  }

  isExpired(endDate: Date): boolean {
    const today = new Date();
    endDate = new Date(endDate);

    return endDate < today;
  }
}
