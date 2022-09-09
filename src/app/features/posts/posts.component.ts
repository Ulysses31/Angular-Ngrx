import { PostDto } from 'src/app/models/posts.model';
import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { deletePost, getPosts } from './state/posts.actions';
import { State } from './state/posts.reducer';
import { Router } from '@angular/router';
import { getPostsSelector } from './state/posts.selectors';
import { PostsService } from './service/posts.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  posts: PostDto[] = [];
  headers: string[] = [];

  constructor(
    private store: Store<State>,
    private service: PostsService,
    private router: Router
  ) {
    this.store
      .pipe(select(getPostsSelector))
      .subscribe((data: any) => {
        if (data) {
          this.posts = data;
        }
      });

    this.getAllPosts().subscribe((posts: PostDto[]) => {
      this.headers = Object.getOwnPropertyNames(posts[0]);
      this.store.dispatch(getPosts({ posts }));
    });
  }

  ngOnInit(): void {
    console.log('PostsComponent onInit');
  }

  ngAfterViewInit(): void {
    console.log('PostsComponent onAfterViewInit');
  }

  ngOnDestroy(): void {
    console.log('PostsComponent onDestroy');
  }

  handleDelete(id: number): void {
    this.service.deletePost(id).subscribe((result) => {
      if (result) {
        this.store.dispatch(deletePost({ postId: id }));
      }
    });
  }

  handleEdit(id: number): void {
    this.router.navigate(['/posts', id], {
      queryParams: { backUrl: this.router.url }
    });
  }

  handleNew(): void {
    this.router.navigate(['/posts', 0], {
      queryParams: { backUrl: this.router.url }
    });
  }

  getAllPosts(): Observable<PostDto[]> {
    return this.service.getAllPosts();
  }
}
