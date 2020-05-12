import { Component, OnInit, Input , OnDestroy } from '@angular/core';
import { Subscription} from 'rxjs';
import { Post } from '../post.model';
import { PostsService } from '../post.service';
@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {

  
  private postSubscription : Subscription;
  private mode = 'create';
  private postId: string;
  posts: Post[] = [];  
  isLoading = false;
  //postsSub = false;
//  @Input() posts: Post[] = []
constructor(public postsService : PostsService) { }  
ngOnInit(): void {
    //    this.posts = this.postsService.getPosts();
    this.isLoading = true;
this.postsService.getPosts();
this.postSubscription = this.postsService.getPostUpdateListener()
.subscribe((posts: Post[]) => {
setTimeout(()=>{ this.isLoading = false }, 2000);
this.posts = posts;
});


  }
   ngOnDestroy() {
     this.postSubscription.unsubscribe();
   }

   /*onSavePost(form: NgForm){
    if(form.invalid) return;
    
    this.isLoading = true;
    if(this.mode === 'create') {
    this.postsService.addPost(form.value.title, form.value.content);
    }
    else {
    this.postsService.updatePost(this.postId, form.value.title, form.value.content);
    }
    form.resetForm();
    }*/
    
   onDelete(postId: string){
     //call service to delete the POST
    this.postsService.deletePost(postId);  
    }
} 

