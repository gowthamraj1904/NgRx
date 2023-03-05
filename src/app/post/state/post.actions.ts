import { createAction, props } from '@ngrx/store';
import { Post } from './post.model';

export enum PostAction {
    addNewPost = '[Post Page] Add New',
    updatePost = '[Post Page] Update',
    deletePost = '[Post Page] Delete',
    loadPosts = '[Post Page] Load Posts',
    loadPostSuccess = '[Post Page] Load Post Success'
}

export const addNewPost = createAction(PostAction.addNewPost, props<{ post: Post }>());
export const updatePost = createAction(PostAction.updatePost, props<{ post: Post }>());
export const deletePost = createAction(PostAction.deletePost, props<{ post: Post }>());
export const loadPosts = createAction(PostAction.loadPosts);
export const loadPostSuccess = createAction(PostAction.loadPostSuccess, props<{ posts: Array<Post> }>());
