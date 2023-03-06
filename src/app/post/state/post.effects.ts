import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { PostService } from '../post.service';
import { mergeMap, map, switchMap, tap, filter } from 'rxjs/operators';
import { Post } from './post.model';
import { PostActionTypes } from './post.action-types';
import { RouterNavigationAction, RouterNavigatedAction, ROUTER_NAVIGATION } from '@ngrx/router-store';
import { loadPostSuccess } from './post.actions';

@Injectable()
export class PostEffects {
    constructor(private actions$: Actions, private postService: PostService, private router: Router) {}

    load$ = createEffect(() => this.load);
    addNew$ = createEffect(() => this.addNew);
    update$ = createEffect(() => this.update);
    updateRedirect$ = createEffect(() => this.updateRedirect, { dispatch: false });
    delete$ = createEffect(() => this.delete);
    singlePost$ = createEffect(() => this.singlePost);

    load(): Actions {
        return this.actions$.pipe(
            ofType(PostActionTypes.loadPosts),
            mergeMap(() => {
                return this.postService.getPosts().pipe(
                    map((posts: Post[]) => {
                        return PostActionTypes.loadPostSuccess({ posts });
                    })
                );
            })
        );
    }

    addNew(): Actions {
        return this.actions$.pipe(
            ofType(PostActionTypes.addNewPost),
            mergeMap((action) => {
                return this.postService.addNew(action.post).pipe(
                    map((post) => {
                        return PostActionTypes.addNewSuccess({ post });
                    })
                );
            })
        );
    }

    update(): Actions {
        return this.actions$.pipe(
            ofType(PostActionTypes.updatePost),
            switchMap((action) => {
                return this.postService.update(action.post).pipe(
                    map((post) => {
                        return PostActionTypes.updatePostSuccess({ post: action.post });
                    })
                );
            })
        );
    }

    updateRedirect(): Actions {
        return this.actions$.pipe(
            ofType(PostActionTypes.updatePostSuccess),
            tap((action) => {
                this.router.navigate(['/post']);
            })
        );
    }

    delete(): Actions {
        return this.actions$.pipe(
            ofType(PostActionTypes.deletePost),
            switchMap((action) => {
                return this.postService.delete(action.post).pipe(
                    map((post) => {
                        return PostActionTypes.deletePostSuccess({ post: action.post });
                    })
                );
            })
        );
    }

    singlePost(): Actions {
        return this.actions$.pipe(
            ofType(ROUTER_NAVIGATION),
            filter((r: RouterNavigationAction) => {
                return r.payload.routerState.url.startsWith('/post/details');
            }),
            map((r: RouterNavigatedAction | any) => {
                return r.payload.routerState['params'];
            }),
            switchMap((post) => {
                return this.postService.getPostById(post).pipe(
                    map((post) => {
                        const _post = [{ ...post }];
                        return loadPostSuccess({ posts: _post });
                    })
                );
            })
        );
    }
}
