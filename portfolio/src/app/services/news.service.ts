import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import NewsAPI from 'ts-newsapi';
import { INewsApiResponse } from 'ts-newsapi/lib/types';

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
      Authorization: '59495b755bb54878bdc1357ca663c5d1',
    }),
  };

  token = '025b03fd3e48f1fae89a528069a22d52';

  getNews(): Observable<any> {
    return this.http.get<any>(
      `https://gnews.io/api/v4/top-headlines?token=${this.token}&q=software&topic=technology&lang=en&country=us`
    );
  }

  getNewsByWord(word: string): Observable<any> {
    return this.http.get<any>(
      `https://gnews.io/api/v4/top-headlines?token=${this.token}&q=${word}&topic=technology&lang=en&country=us`
    );
  }
}
