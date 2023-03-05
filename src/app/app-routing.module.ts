import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'auth',
        loadChildren: async () => (await import('./auth/auth.module')).AuthModule
    },
    {
        path: 'counter',
        loadChildren: async () => (await import('./counter/counter.module')).CounterModule
    },
    {
        path: 'post',
        loadChildren: async () => (await import('./post/post.module')).PostModule
    },
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: '**',
        pathMatch: 'full',
        component: HomeComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
