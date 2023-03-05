import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { AddPostComponent } from './add-post/add-post.component';
import { EditPostComponent } from './edit-post/edit-post.component';
import { PostListComponent } from './post-list/post-list.component';
import { PostRoutingModule } from './post-routing.module';
import { postReducer } from './state/post.reducer';
import { POST_STATE_NAME } from './state/post.selectors';

@NgModule({
    declarations: [PostListComponent, AddPostComponent, EditPostComponent],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        PostRoutingModule,
        StoreModule.forFeature(POST_STATE_NAME, postReducer)
    ]
})
export class PostModule {}
