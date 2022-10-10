import { Observable } from 'rxjs';

export interface ICoreService<T> {
  apiUrl: string;

  getAll(): Observable<T[]>;
  getById(id: number): Observable<T>;
  insert(dto: T): Observable<T>;
  update(id: string, dto: T): Observable<T>;
  delete(id: number): Observable<T>;
}
