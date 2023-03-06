import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/state/app.model';
import { Post } from '../state/post.model';
import { getPostById } from '../state/post.selectors';
import { Subscription } from 'rxjs';
import { PostActionTypes } from '../state/post.action-types';

@Component({
    selector: 'app-edit-post',
    templateUrl: './edit-post.component.html',
    styleUrls: ['./edit-post.component.scss']
})
export class EditPostComponent implements OnInit, OnDestroy {
    updatePostForm: FormGroup;
    post: Post | undefined;
    postSubscription: Subscription;
    routeSubscription: Subscription;

    constructor(private store: Store<AppState>) {}

    onUpdatePost(): void {
        if (this.updatePostForm.invalid) {
            return;
        }

        const post: Post = this.updatePostForm.value;
        post.id = this.post?.id;

        this.store.dispatch(PostActionTypes.updatePost({ post }));
    }

    createForm(): void {
        this.updatePostForm = new FormGroup({
            title: new FormControl(null, [Validators.required, Validators.minLength(5)]),
            description: new FormControl(null, [Validators.required, Validators.minLength(10)])
        });
    }

    getPostById(): void {
        this.postSubscription = this.store.select(getPostById).subscribe((post) => {
            if (post) {
                this.post = post;

                this.updatePostForm.patchValue({
                    title: post?.title,
                    description: post?.description,
                    id: post?.id
                });
            }
        });
    }

    ngOnInit(): void {
        // this.routeSubscription = this.route.paramMap.subscribe((params) => {
        //     const id = Number(params.get('id'));

        //     this.postSubscription = this.store.pipe(select(getPostById(id))).subscribe((res) => {
        //         this.post = res;

        //         this.createForm();
        //     });
        // });

        this.createForm();
        this.getPostById();
    }

    ngOnDestroy(): void {
        if (this.routeSubscription) this.routeSubscription.unsubscribe();

        if (this.postSubscription) this.postSubscription.unsubscribe();
    }
}
