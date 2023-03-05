import { createAction, props } from '@ngrx/store';
import { Post } from './post.model';

export enum PostAction {
    addNewPost = '[Post] Add New',
    updatePost = '[Post] Update',
    deletePost = '[Post] Delete'
}

export const addNewPost = createAction(PostAction.addNewPost, props<{ post: Post }>());
export const updatePost = createAction(PostAction.updatePost, props<{ post: Post }>());
export const deletePost = createAction(PostAction.deletePost, props<{ post: Post }>());
