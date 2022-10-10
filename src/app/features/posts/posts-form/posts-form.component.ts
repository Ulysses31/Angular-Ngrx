import { CoreSingleComponent } from './../../../core/core-single.component';
import { PostDto } from 'src/app/models/posts.model';
import { Component } from '@angular/core';
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

@Component({
  selector: 'app-posts-form',
  templateUrl: './posts-form.component.html',
  styleUrls: ['./posts-form.component.css']
})
export class PostsFormComponent extends CoreSingleComponent<PostDto> {
  id: number = 0;
  totalPosts: number = 0;
  post: PostDto = { id: 0, userId: 0, title: null, body: null };

  constructor(
    public override store: Store<State>,
    public override service: PostsService,
    public override route: ActivatedRoute,
    public override router: Router
  ) {
    super(store, service, route, router);
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
  }

  override ngOnInit(): void {
    super.ngOnInit();
    console.log('PostsFormComponent onInit');
  }

  override ngAfterViewInit(): void {
    super.ngAfterViewInit();
    console.log('PostsFormComponent onAfterViewInit');
  }

  override ngOnDestroy(): void {
    super.ngOnDestroy();
    console.log('PostsFormComponent onDestroy');
  }

  newModel(): void {
    this.store.dispatch(
      getPostById({
        post: { id: 0, userId: 0, title: null, body: null }
      })
    );
  }

  editModel(post: PostDto): void {
    if (post) {
      this.store.dispatch(getPostById({ post: post }));
    }
  }

  updateModel(post: PostDto): void {
    this.store.dispatch(updatePost({ updatePost: post }));
  }

  insertModel(post: PostDto): void {
    post.id = this.totalPosts + 1;
    this.store.dispatch(insertPost({ newPost: post }));
  }
}
