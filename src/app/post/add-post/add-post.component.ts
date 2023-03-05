import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.model';
import { PostActionTypes } from '../state/post.action-types';
import { Post } from '../state/post.model';

@Component({
    selector: 'app-add-post',
    templateUrl: './add-post.component.html',
    styleUrls: ['./add-post.component.scss']
})
export class AddPostComponent implements OnInit {
    addPostForm: FormGroup;

    constructor(private store: Store<AppState>, private router: Router) {}

    onAddPost(): void {
        if (this.addPostForm.invalid) {
            return;
        }

        const post: Post = this.addPostForm.value;
        this.store.dispatch(PostActionTypes.addNewPost({ post }));
        this.router.navigate(['post']);
    }

    ngOnInit(): void {
        this.addPostForm = new FormGroup({
            title: new FormControl('', [Validators.required, Validators.minLength(5)]),
            description: new FormControl('', [Validators.required, Validators.minLength(10)])
        });
    }
}
