import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './posts.reducer';

export const postsState = createFeatureSelector<State>('posts');

export const getPostsSelector = createSelector(
  postsState,
  (state: State) => state.posts
);

export const getSelectedPostSelector = createSelector(
  postsState,
  (state: State) => state.selectedPost
);

export const getTotalPostsSelector = createSelector(
  postsState,
  (state: State) => state.posts.length
);
