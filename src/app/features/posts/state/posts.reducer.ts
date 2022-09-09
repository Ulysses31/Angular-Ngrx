import {
  deletePost,
  getPostById,
  getPosts,
  insertPost,
  updatePost
} from './posts.actions';
import { createReducer, on } from '@ngrx/store';
import { PostDto } from 'src/app/models/posts.model';

export interface State {
  posts: PostDto[];
  selectedPost: PostDto | null;
}

export const initialState: State = {
  posts: [],
  selectedPost: null
};

export const postsReducer = createReducer(
  initialState,
  on(getPosts, (state, action) => {
    console.log(state, action);
    return { ...state, posts: action.posts, selectedPost: null };
  }),
  on(getPostById, (state, action) => {
    console.log(state, action);
    return { ...state, selectedPost: action.post };
  }),
  on(insertPost, (state, action) => {
    console.log(state, action);
    return {
      ...state,
      posts: [...state.posts, action.newPost],
      selectedPost: { id: 0, userId: 0, title: null, body: null }
    };
  }),
  on(updatePost, (state, action) => {
    console.log(state, action);
    return {
      ...state,
      posts: state.posts.map((item) => {
        if (item.id === action.updatePost.id) {
          return action.updatePost;
        } else {
          return item;
        }
      }),
      selectedPost: action.updatePost
    };
  }),
  on(deletePost, (state, action) => {
    console.log(state, action);
    return {
      ...state,
      posts: state.posts.filter((item) => {
        return item.id !== action.postId;
      })
    };
  })
);
