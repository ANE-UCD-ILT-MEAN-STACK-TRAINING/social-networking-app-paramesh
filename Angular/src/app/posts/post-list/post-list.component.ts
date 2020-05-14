import { Component, OnInit, Input , OnDestroy } from '@angular/core';
import { Subscription} from 'rxjs';
import { Post } from '../post.model';
import { PostsService } from '../post.service';
import { PageEvent } from "@angular/material/paginator";
import { ThrowStmt } from '@angular/compiler';
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
  totalPosts = 10;
  postsPerPage = 5;
  currentPage = 1;  
  pageSizeOptions = [1, 2, 5, 10];
  postsSub: any;
  //postsSub = false;
//  @Input() posts: Post[] = []
constructor(public postsService : PostsService) { }  
ngOnInit(): void {
    //    this.posts = this.postsService.getPosts();
    this.isLoading = true;
this.postsService.getPosts(this.postsPerPage, this.currentPage);
this.postsSub = this.postsService
.getPostUpdateListener()
.subscribe((postData: { posts: Post[]; postCount: number}) => {
  this.isLoading = false;
  this.totalPosts = postData.postCount;
  this.posts = postData.posts;
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
    this.isLoading = true;
     this.postsService.deletePost(postId).subscribe(() => {
       this.postsService.getPosts(this.postsPerPage, this.currentPage);
     });  
    }
    onChangedPage(pageData: PageEvent) {
      this.isLoading = true;
      this.currentPage = pageData.pageIndex + 1;
      this.postsPerPage = pageData.pageSize;
      this.postsService.getPosts(this.postsPerPage, this.currentPage);
      console.log(pageData);
    }
  

  } 

