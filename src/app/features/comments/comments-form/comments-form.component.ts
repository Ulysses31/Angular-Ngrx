import { CommentDto } from 'src/app/models/comments.model';
import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';
import { State } from '../state/comments.reducer';
import { select, Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import {
  getCommentById,
  insertComment,
  updateComment
} from '../state/comments.actions';
import {
  getSelectedCommentSelector,
  getTotalCommentsSelector
} from '../state/comments.selectors';
import { CommentsService } from '../service/comments.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-comments-form',
  templateUrl: './comments-form.component.html',
  styleUrls: ['./comments-form.component.css']
})
export class CommentsFormComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  id: number = 0;
  totalComments: number = 0;
  comment: CommentDto = {
    id: 0,
    postId: 0,
    name: null,
    email: null,
    body: null
  };

  constructor(
    private store: Store<State>,
    private service: CommentsService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.store
      .pipe(select(getSelectedCommentSelector))
      .subscribe((data: any) => {
        if (data) {
          this.comment = { ...data };
        }
      });

    this.store
      .pipe(select(getTotalCommentsSelector))
      .subscribe((data: any) => {
        if (data) {
          this.totalComments = data;
        }
      });

    this.getComment();
  }

  ngOnInit(): void {
    console.log('CommentsFormComponent onInit');
  }

  ngAfterViewInit(): void {
    console.log('CommentsFormComponent onAfterViewInit');
  }

  ngOnDestroy(): void {
    console.log('CommentsFormComponent onDestroy');
  }

  getComment(): void {
    this.route.params.subscribe((data: any) => {
      this.id = data['id'];
      if (this.id > 0) {
        this.service
          .getById(this.id)
          .subscribe((comment: CommentDto) => {
            if (comment) {
              this.store.dispatch(
                getCommentById({ comment: comment })
              );
            }
          });
      } else {
        this.store.dispatch(
          getCommentById({
            comment: {
              id: 0,
              postId: 0,
              name: null,
              email: null,
              body: null
            }
          })
        );
      }
    });
  }

  handleBack(): void {
    this.route.queryParams.subscribe((data) =>
      this.router.navigateByUrl(data['backUrl'])
    );
  }

  handleFormStatus(e: NgForm): void {
    console.log(e);
  }

  handleSubmit(e: NgForm): void {
    console.log(e.value);
    if (e.value.id === 0) {
      e.value.id = this.totalComments + 1;
      this.service.insert(e.value).subscribe((data) => {
        if (data) {
          this.store.dispatch(insertComment({ newComment: e.value }));
        }
      });
    } else {
      this.service.update(e.value.id, e.value).subscribe((data) => {
        if (data) {
          this.store.dispatch(
            updateComment({ updateComment: e.value })
          );
        }
      });
    }
  }

  handleReset(): void {
    this.getComment();
  }
}
