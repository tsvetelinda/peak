import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Mountain } from './types/mountain';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getMountains() {
    const { apiUrl } = environment;
    let url = `${apiUrl}/mountains`;

    return this.http.get<Mountain[]>(url);
  }
}
