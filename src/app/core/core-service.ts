import { ICoreService } from './core-service.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoreService<T> implements ICoreService<T> {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  apiUrl: string = '';

  constructor(public http: HttpClient) {}

  getAll(): Observable<T[]> {
    return this.http.get<T[]>(this.apiUrl).pipe(
      // tap((dto) => console.log(dto)),
      catchError((err) => {
        console.log(err);
        return of();
      })
    );
  }

  getById(id: number): Observable<T> {
    return this.http.get<T>(`${this.apiUrl}/${id}`).pipe(
      // tap((dto) => console.log(dto)),
      catchError((err) => {
        console.log(err);
        return of();
      })
    );
  }

  insert(dto: T): Observable<T> {
    return this.http.post<T>(this.apiUrl, dto, this.httpOptions);
  }

  update(id: string, dto: T): Observable<T> {
    return this.http.put<T>(
      `${this.apiUrl}/${id}`,
      dto,
      this.httpOptions
    );
  }

  delete(id: number): Observable<T> {
    return this.http.delete<T>(
      `${this.apiUrl}/${id}`,
      this.httpOptions
    );
  }
}
