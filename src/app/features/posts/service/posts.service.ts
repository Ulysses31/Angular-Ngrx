import { PostDto } from 'src/app/models/posts.model';
import { Injectable } from '@angular/core';
import { CoreService } from 'src/app/core/core-service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostsService extends CoreService<PostDto> {
  override apiUrl: string =
    'https://jsonplaceholder.typicode.com/posts';

  constructor(public override http: HttpClient) {
    super(http);
  }
}
