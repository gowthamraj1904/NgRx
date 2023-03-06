import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RouterStateUrl } from 'src/app/state/router/custom-serializer';
import { getCurrentRoute } from 'src/app/state/router/router.selectors';
import { Post, PostState } from './post.model';

export const POST_STATE_NAME = 'posts';
const getPostsState = createFeatureSelector<PostState>(POST_STATE_NAME);

export const getPosts = createSelector(getPostsState, (state: PostState) => state.posts);
// export const getPostById = (props: number) =>
//     createSelector(getPostsState, (state: PostState) => state.posts?.find((post: Post) => post.id === props));

export const getPostById = createSelector(getPosts, getCurrentRoute, (posts, route: RouterStateUrl) => {
    return posts ? posts.find((post) => post.id === Number(route.params['id'])) : null;
});
