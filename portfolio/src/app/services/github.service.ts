import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GithubService {
  constructor(private http: HttpClient) {}

  getProyects(): Observable<any> {
    return this.http.get<any>(
      'https://api.github.com/users/alvaroherbon/repos'
    );
  }

  getProyect(name: String): Observable<any> {
    return this.http.get<any>(
      `https://api.github.com/repos/alvaroherbon/${name}`
    );
  }

  getCommits(name: String): Observable<any> {
    return this.http.get<any>(
      `https://api.github.com/repos/alvaroherbon/${name}/commits`
    );
  }
}
