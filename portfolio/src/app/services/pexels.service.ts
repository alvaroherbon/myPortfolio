import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PexelsService {
  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
      Authorization: '563492ad6f917000010000010fb6a15e15b44da2b108aad3e6e894df',
    }),
  };

  getPictures(): Observable<any> {
    return this.http.get<any>(
      'https://api.pexels.com/v1/search?query=people',
      this.httpOptions
    );
  }
  getPicture(name: string): Observable<any> {
    return this.http.get<any>(
      `https://api.pexels.com/v1/search?query=${name}`,
      this.httpOptions
    );
  }
}
