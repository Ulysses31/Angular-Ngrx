import {
  deleteComment,
  getCommentById,
  getComments,
  insertComment,
  updateComment
} from './comments.actions';
import { createReducer, on } from '@ngrx/store';
import { CommentDto } from 'src/app/models/comments.model';

export interface State {
  comments: CommentDto[];
  selectedComment: CommentDto | null;
}

export const initialState: State = {
  comments: [],
  selectedComment: null
};

export const commentsReducer = createReducer(
  initialState,
  on(getComments, (state, action) => {
    console.log(state, action);
    return {
      ...state,
      comments: action.comments,
      selectedComment: null
    };
  }),
  on(getCommentById, (state, action) => {
    console.log(state, action);
    return { ...state, selectedComment: action.comment };
  }),
  on(insertComment, (state, action) => {
    console.log(state, action);
    return {
      ...state,
      comments: [...state.comments, action.newComment],
      selectedComment: { id: 0, userId: 0, title: null, body: null }
    };
  }),
  on(updateComment, (state, action) => {
    console.log(state, action);
    return {
      ...state,
      comments: state.comments.map((item) => {
        if (item.id === action.updateComment.id) {
          return action.updateComment;
        } else {
          return item;
        }
      }),
      selectedComment: action.updateComment
    };
  }),
  on(deleteComment, (state, action) => {
    console.log(state, action);
    return {
      ...state,
      comments: state.comments.filter((item) => {
        return item.id !== action.commentId;
      })
    };
  })
);
