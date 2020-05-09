import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Post } from '../post.model';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {

  constructor() { }

  @Output() postCreated = new EventEmitter<Post>();
  ngOnInit(): void {
  }
  enteredTitle = '';
  enteredContent = '';
  onAddPost(){   
    const post: Post = {
      title: this.enteredTitle,
      content:this.enteredContent
    }
    this.postCreated.emit(post);
  }

    /*  
  enteredValue = '';
  newPost = 'No Content';
  onAddPost(){
    //console.dir(postInput);
    this.newPost= this.enteredValue;
    //alert("Save Post Button Clicked");
  }*

  /*
  onAddPost(postInput : HTMLTextAreaElement){
    //console.dir(postInput);
    this.newPost= postInput.value;
    //alert("Save Post Button Clicked");
  }*/
  
}
