import { CommentDto } from 'src/app/models/comments.model';
import { createAction, props } from '@ngrx/store';

export const getComments = createAction(
  '[Comments] Get all comments',
  props<{ comments: CommentDto[] }>()
);

export const getCommentById = createAction(
  '[Comments] Get comment by id',
  props<{ comment: CommentDto }>()
);

export const insertComment = createAction(
  '[Comments] Insert new comment',
  props<{ newComment: any }>()
);

export const updateComment = createAction(
  '[Comments] Update comment',
  props<{ updateComment: any }>()
);

export const deleteComment = createAction(
  '[Comments] Delete comment',
  props<{ commentId: any }>()
);
