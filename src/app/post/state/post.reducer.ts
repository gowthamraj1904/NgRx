import { createReducer, on } from '@ngrx/store';
import { PostActionTypes } from './post.action-types';
import { Post, PostState } from './post.model';
import { initialState } from './post.state';

const _postReducer = createReducer(
    initialState,
    on(PostActionTypes.addNewPost, (state: PostState, action) => {
        const post = { ...action.post };
        post.id = state.posts?.length + 1;

        return {
            ...state,
            posts: [...state.posts, post]
        };
    }),
    on(PostActionTypes.updatePost, (state: PostState, action) => {
        const post = state.posts?.map((post: Post) => (action.post.id === post.id ? action.post : post));

        return {
            ...state,
            posts: post
        };
    }),
    on(PostActionTypes.deletePost, (state: PostState, action) => {
        const posts = state.posts?.filter((post: Post) => action.post.id !== post.id);

        return {
            ...state,
            posts: posts
        };
    }),
    on(PostActionTypes.loadPostSuccess, (state: PostState, action: { posts: Post[] }) => {
        return {
            ...state,
            posts: action.posts
        };
    })
);

export const postReducer = (state: any, action: any) => {
    return _postReducer(state, action);
};
