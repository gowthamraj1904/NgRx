import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Post, PostState } from './post.model';

export const POST_STATE_NAME = 'posts';
const getPostsState = createFeatureSelector<PostState>(POST_STATE_NAME);

export const getPosts = createSelector(getPostsState, (state: PostState) => state.posts);
export const getPostById = (props: number) =>
    createSelector(getPostsState, (state: PostState) => state.posts?.find((post: Post) => post.id === props));
