import { Component, OnInit } from '@angular/core';
import { Post } from '../state/post.model';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/state/app.model';
import { Store } from '@ngrx/store';
import { getPostById } from '../state/post.selectors';

@Component({
    selector: 'app-single-post',
    templateUrl: './single-post.component.html',
    styleUrls: ['./single-post.component.scss']
})
export class SinglePostComponent implements OnInit {
    post$: Observable<any>;

    constructor(private store: Store<AppState>) {}

    ngOnInit(): void {
        this.post$ = this.store.select(getPostById);
    }
}
