import { createAction, props } from '@ngrx/store';
import { Post } from './post.model';

enum PostAction {
    addNew = '[Post Page] Add New',
    update = '[Post Page] Update',
    delete= '[Post Page] Delete',
    load = '[Post Page] Load Posts',
    loadSuccess = '[Post Page] Load Post Success',
    addNewSuccess= '[Post Page] Add New Post Success'
}

export const addNewPost = createAction(PostAction.addNew, props<{ post: Post }>());
export const updatePost = createAction(PostAction.update, props<{ post: Post }>());
export const deletePost = createAction(PostAction.delete, props<{ post: Post }>());
export const loadPosts = createAction(PostAction.load);
export const loadPostSuccess = createAction(PostAction.loadSuccess, props<{ posts: Array<Post> }>());
export const addNewSuccess = createAction(PostAction.addNewSuccess, props<{ post: Post }>());
