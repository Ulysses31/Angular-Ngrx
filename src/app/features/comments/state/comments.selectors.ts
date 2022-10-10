import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './comments.reducer';

export const commentsState = createFeatureSelector<State>('comments');

export const getCommentsSelector = createSelector(
  commentsState,
  (state: State) => state.comments
);

export const getSelectedCommentSelector = createSelector(
  commentsState,
  (state: State) => state.selectedComment
);

export const getTotalCommentsSelector = createSelector(
  commentsState,
  (state: State) => state.comments.length
);
