import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddPostComponent } from './add-post/add-post.component';
import { EditPostComponent } from './edit-post/edit-post.component';
import { PostListComponent } from './post-list/post-list.component';
import { SinglePostComponent } from './single-post/single-post.component';

const routes: Routes = [
    {
        path: '',
        component: PostListComponent,
        children: [
            {
                path: 'add',
                component: AddPostComponent
            },
            {
                path: 'edit/:id',
                component: EditPostComponent
            }
        ]
    },
    {
        path: 'details/:id',
        component: SinglePostComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PostRoutingModule {}
