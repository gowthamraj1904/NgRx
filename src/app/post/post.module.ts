import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AddPostComponent } from './add-post/add-post.component';
import { EditPostComponent } from './edit-post/edit-post.component';
import { PostListComponent } from './post-list/post-list.component';
import { PostRoutingModule } from './post-routing.module';
import { PostEffects } from './state/post.effects';
import { postReducer } from './state/post.reducer';
import { POST_STATE_NAME } from './state/post.selectors';
import { SinglePostComponent } from './single-post/single-post.component';

@NgModule({
    declarations: [PostListComponent, AddPostComponent, EditPostComponent, SinglePostComponent],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        PostRoutingModule,
        StoreModule.forFeature(POST_STATE_NAME, postReducer),
        EffectsModule.forFeature([PostEffects])
    ]
})
export class PostModule {}
