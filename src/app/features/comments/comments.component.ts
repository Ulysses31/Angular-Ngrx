import { CommentDto } from 'src/app/models/comments.model';
import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { deleteComment, getComments } from './state/comments.actions';
import { State } from './state/comments.reducer';
import { ActivatedRoute, Router } from '@angular/router';
import { getCommentsSelector } from './state/comments.selectors';
import { CommentsService } from './service/comments.service';
import { CoreListComponent } from 'src/app/core/core-list.component';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent extends CoreListComponent<CommentDto> {
  comments: CommentDto[] = [];

  constructor(
    private store: Store<State>,
    public override service: CommentsService,
    public override router: Router,
    public override route: ActivatedRoute
  ) {
    super(service, route, router);
    this.store
      .pipe(select(getCommentsSelector))
      .subscribe((data: any) => {
        if (data) {
          this.comments = data;
        }
      });

    this.getAll().subscribe((comments: CommentDto[]) => {
      this.store.dispatch(getComments({ comments }));
    });
  }

  override ngOnInit(): void {
    super.ngOnInit();
    console.log('CommentsComponent onInit');
  }

  override ngAfterViewInit(): void {
    super.ngAfterViewInit();
    console.log('CommentsComponent onAfterViewInit');
  }

  override ngOnDestroy(): void {
    super.ngOnDestroy();
    console.log('CommentsComponent onDestroy');
  }

  handleDelete(id: number): void {
    this.service.delete(id).subscribe((result) => {
      if (result) {
        this.store.dispatch(deleteComment({ commentId: id }));
      }
    });
  }
}
