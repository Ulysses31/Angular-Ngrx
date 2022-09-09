import { PostDto } from 'src/app/models/posts.model';
import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';
import { State } from '../state/posts.reducer';
import { select, Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import {
  getPostById,
  insertPost,
  updatePost
} from '../state/posts.actions';
import {
  getSelectedPostSelector,
  getTotalPostsSelector
} from '../state/posts.selectors';
import { PostsService } from '../service/posts.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-posts-form',
  templateUrl: './posts-form.component.html',
  styleUrls: ['./posts-form.component.css']
})
export class PostsFormComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  id: number = 0;
  totalPosts: number = 0;
  post: PostDto = { id: 0, userId: 0, title: null, body: null };

  constructor(
    private store: Store<State>,
    private service: PostsService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.store
      .pipe(select(getSelectedPostSelector))
      .subscribe((data: any) => {
        if (data) {
          this.post = { ...data };
        }
      });

    this.store
      .pipe(select(getTotalPostsSelector))
      .subscribe((data: any) => {
        if (data) {
          this.totalPosts = data;
        }
      });

    this.getPost();
  }

  ngOnInit(): void {
    console.log('PostsFormComponent onInit');
  }

  ngAfterViewInit(): void {
    console.log('PostsFormComponent onAfterViewInit');
  }

  ngOnDestroy(): void {
    console.log('PostsFormComponent onDestroy');
  }

  getPost(): void {
    this.route.params.subscribe((data: any) => {
      this.id = data['id'];
      if (this.id > 0) {
        this.service
          .getPostById(this.id)
          .subscribe((post: PostDto) => {
            if (post) {
              this.store.dispatch(getPostById({ post: post }));
            }
          });
      } else {
        this.store.dispatch(
          getPostById({
            post: { id: 0, userId: 0, title: null, body: null }
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
      e.value.id = this.totalPosts + 1;
      this.service.insertPost(e.value).subscribe((data) => {
        if (data) {
          this.store.dispatch(insertPost({ newPost: e.value }));
        }
      });
    } else {
      this.service
        .updatePost(e.value.id, e.value)
        .subscribe((data) => {
          if (data) {
            this.store.dispatch(updatePost({ updatePost: e.value }));
          }
        });
    }
  }

  handleReset(): void {
    this.getPost();
  }
}
