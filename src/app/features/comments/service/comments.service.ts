import { CoreService } from 'src/app/core/core-service';
import { CommentDto } from 'src/app/models/comments.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommentsService extends CoreService<CommentDto> {
  override apiUrl: string =
    'https://jsonplaceholder.typicode.com/comments';

  constructor(public override http: HttpClient) {
    super(http);
  }
}
