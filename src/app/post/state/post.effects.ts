import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { PostService } from '../post.service';
import { mergeMap, map, switchMap } from 'rxjs/operators';
import { Post } from './post.model';
import { PostActionTypes } from './post.action-types';

@Injectable()
export class PostEffects {
    constructor(private actions$: Actions, private postService: PostService) {}

    load$ = createEffect(() => this.load);
    addNew$ = createEffect(() => this.addNew);
    update$ = createEffect(() => this.update);
    delete$ = createEffect(() => this.delete);

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

    delete(): Actions {
        return this.actions$.pipe(
            ofType(PostActionTypes.deletePost),
            switchMap((action) => {
                return this.postService.delete(action.post).pipe(
                    map((post) => {
                        console.log(post);
                        return PostActionTypes.deletePostSuccess({ post: action.post });
                    })
                );
            })
        );
    }
}
