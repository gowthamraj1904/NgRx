import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { PostService } from '../post.service';
import { loadPosts, loadPostSuccess } from './post.actions';
import { mergeMap, map } from 'rxjs/operators';
import { Post } from './post.model';

@Injectable()
export class PostEffects {
    constructor(private actions$: Actions, private postService: PostService) {}

    loadPost$ = createEffect(() => this.loadPost);

    loadPost(): Actions {
        return this.actions$.pipe(
            ofType(loadPosts),
            mergeMap(() => {
                return this.postService.getPosts().pipe(
                    map((posts: Post[]) => {
                        return loadPostSuccess({ posts });
                    })
                );
            })
        );
    }
}
