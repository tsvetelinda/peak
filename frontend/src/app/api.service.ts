import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Mountain } from './types/mountain';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getMountains() {
    let url = `/api/mountains`;

    return this.http.get<Mountain[]>(url);
  }
}
