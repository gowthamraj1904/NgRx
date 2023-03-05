import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/state/app.model';
import { PostActionTypes } from '../state/post.action-types';
import { loadPosts } from '../state/post.actions';
import { Post } from '../state/post.model';
import { getPosts } from '../state/post.selectors';

@Component({
    selector: 'app-post-list',
    templateUrl: './post-list.component.html',
    styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {
    posts$: Observable<Post[] | null>;

    constructor(private store: Store<AppState>) {}

    onDelete(post: Post): void {
        if (confirm('Are you sure want to delete?')) {
            this.store.dispatch(PostActionTypes.deletePost({ post }));
        }
    }

    ngOnInit(): void {
        this.posts$ = this.store.select(getPosts)
        this.store.dispatch(loadPosts());
    }
}
