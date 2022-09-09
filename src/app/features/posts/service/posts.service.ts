import { PostDto } from 'src/app/models/posts.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  apiUrl: string = 'https://jsonplaceholder.typicode.com/posts';

  constructor(private http: HttpClient) {}

  getAllPosts(): Observable<PostDto[]> {
    return this.http.get<PostDto[]>(this.apiUrl).pipe(
      // tap((dto) => console.log(dto)),
      catchError((err) => {
        console.log(err);
        return of();
      })
    );
  }

  getPostById(id: number): Observable<PostDto> {
    return this.http.get<PostDto>(`${this.apiUrl}/${id}`).pipe(
      // tap((dto) => console.log(dto)),
      catchError((err) => {
        console.log(err);
        return of();
      })
    );
  }

  insertPost(dto: PostDto): Observable<PostDto> {
    return this.http.post<PostDto>(
      this.apiUrl,
      dto,
      this.httpOptions
    );
  }

  updatePost(id: string, dto: PostDto): Observable<PostDto> {
    return this.http.put<PostDto>(
      `${this.apiUrl}/${id}`,
      dto,
      this.httpOptions
    );
  }

  deletePost(id: number): Observable<PostDto> {
    return this.http.delete<PostDto>(
      `${this.apiUrl}/${id}`,
      this.httpOptions
    );
  }
}
