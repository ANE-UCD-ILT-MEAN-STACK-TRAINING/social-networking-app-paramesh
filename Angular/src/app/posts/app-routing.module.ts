import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RouterModule, Routes } from '@angular/router';
import { PostListComponent } from './posts/post-list/post-list.component';
import { PostCreateComponent } from './posts/post-create/post-create.component';


@NgModule({
})
export class AppRoutingModule {}

const routes: Routes = [
    { path: '', component: PostListComponent},
    { path: 'create', component: PostCreateComponent}
    ];

    { path: 'edit/:postId', component: PostCreateComponent}