import { PostDto } from 'src/app/models/posts.model';
import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { deletePost, getPosts } from './state/posts.actions';
import { State } from './state/posts.reducer';
import { ActivatedRoute, Router } from '@angular/router';
import { PostsService } from './service/posts.service';
import { CoreListComponent } from 'src/app/core/core-list.component';
import { getPostsSelector } from './state/posts.selectors';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent extends CoreListComponent<PostDto> {
  posts: PostDto[] = [];

  constructor(
    private store: Store<State>,
    public override service: PostsService,
    public override router: Router,
    public override route: ActivatedRoute
  ) {
    super(service, route, router);
    this.store
      .pipe(select(getPostsSelector))
      .subscribe((data: any) => {
        if (data) {
          this.posts = data;
        }
      });

    this.getAll().subscribe((posts: PostDto[]) => {
      this.store.dispatch(getPosts({ posts }));
    });
  }

  override ngOnInit(): void {
    super.ngOnInit();
    console.log('PostsComponent onInit');
  }

  override ngAfterViewInit(): void {
    super.ngAfterViewInit();
    console.log('PostsComponent onAfterViewInit');
  }

  override ngOnDestroy(): void {
    super.ngOnDestroy();
    console.log('PostsComponent onDestroy');
  }

  handleDelete(id: number): void {
    this.service.delete(id).subscribe((result) => {
      if (result) {
        this.store.dispatch(deletePost({ postId: id }));
      }
    });
  }
}
