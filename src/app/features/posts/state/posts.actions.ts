import { PostDto } from 'src/app/models/posts.model';
import { createAction, props } from '@ngrx/store';

export const getPosts = createAction(
  '[Posts] Get all posts',
  props<{ posts: PostDto[] }>()
);

export const getPostById = createAction(
  '[Posts] Get post by id',
  props<{ post: PostDto }>()
);

export const insertPost = createAction(
  '[Posts] Insert new post',
  props<{ newPost: any }>()
);

export const updatePost = createAction(
  '[Posts] Update post',
  props<{ updatePost: any }>()
);

export const deletePost = createAction(
  '[Posts] Delete post',
  props<{ postId: any }>()
);
