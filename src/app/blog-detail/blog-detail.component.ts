import { Component, OnInit } from '@angular/core';
import { BlogsService } from '../../services/blogs.service';
import { ResponseModel } from '../../models/response.model';
import { CommonService } from '../../services/common.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule , Validators } from '@angular/forms';
import { MustMatch } from '../../helper/must-match.validator';
declare var $: any;

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.css']
})
export class BlogDetailComponent implements OnInit {

	slug = "";
	detail : any;
	loaded = false;
  isLogged = "false";
  commentForm: FormGroup;
  commentEditForm: FormGroup;
  submittedComment = false;
  EditedComment = false;
  likes = 0 ;
  liked = false;
  comments: any;
  username = "";
  editmode = false;
  editableComment = "";

  constructor(private formBuilder: FormBuilder,private blogsservice: BlogsService,private route: ActivatedRoute, private  commonService: CommonService) { 
  	

  	
  }

  ngOnInit() {

    this.loaded = false;
    this.route.queryParams.subscribe(params => {
    this.slug = params["slug"];      
    });

    setTimeout(()=>{
      this.blogsservice.getDetail(this.slug)
        .subscribe(data => {
          this.detail = data;
          this.likes = this.detail["likes"];
          setTimeout(()=>{
                     
             this.blogsservice.getComment(this.detail["title"])
              .subscribe(data => {
                this.comments = data["items"];       
              });
              this.loaded = true; 
          },500);
        });

     

    },300);

  	if(this.commonService.userDetails != undefined && this.commonService.userDetails["username"] != "" && this.commonService.userDetails["username"] != null)
    {
      this.isLogged = this.commonService.userDetails["isLogged"];
      this.username=this.commonService.userDetails["username"];
    }
    this.commentForm = this.formBuilder.group({
        Comment: ['', Validators.required]
    });
    this.commentEditForm = this.formBuilder.group({
        Comment: ['', Validators.required]
    });
    this.commentEditForm.controls["Comment"].disable();
  }

  onSubmitComment(){
    this.submittedComment = true;

        // stop here if form is invalid
        if (this.commentForm.invalid) {
            return;
        }

        var comment = {
          "createdAt":new Date(),
          "id": this.detail["id"],
          "comment":this.commentForm.value["Comment"],
          "postTitle":this.detail["title"],
          "commentBy":this.username
        }
        
        
        this.blogsservice.postComment(comment);
        setTimeout(()=>{
          this.ngOnInit();       
        },300);
        // display form values on success
        // this.loaded = false;
        
  }

  onEditComment(){
    this.EditedComment = true;

        // stop here if form is invalid
        if (this.commentEditForm.invalid) {
            return;
        }        
        

        for (var i = 0; i < this.comments.length; ++i) {
          if((this.comments[i]["id"]).toString() == this.editableComment){
            this.comments[i]["comment"] = this.commentEditForm.value["Comment"];
            this.blogsservice.editComment(this.comments[i]["id"],this.comments[i]);
            $('#editComment').modal('hide');
            setTimeout(()=>{
              this.ngOnInit();
            },300);
          }
        }        
        // display form values on success
        // this.loaded = false;
        
  }

  get f() { return this.commentForm.controls; }
  get f2() { return this.commentEditForm.controls; }

  toggleLike(){
    if(this.isLogged == "true")
    {
      if(!this.liked)
      {
        this.likes = this.likes+1;  
        this.detail["likes"] = this.likes;
        this.blogsservice.postLike(this.detail["id"],this.detail);
        this.liked = true;
      }
      else{
        this.likes = this.likes-1
        this.detail["likes"] = this.likes;
        this.blogsservice.postLike(this.detail["id"],this.detail);
        this.liked = false;
      }
      
    }
    else{
      $('#myModal').modal('show');      
    }
  }
  clodseModal()
  {
        $('#myModal').modal('hide');
  }

  editComment(commentId,comment){
    if(this.editmode){
      this.editmode = false;
      this.editableComment = "";
    }
    else{
      this.editmode = true;
      this.editableComment = commentId;
      this.commentEditForm.controls["Comment"].setValue(comment);
      this.commentEditForm.controls["Comment"].enable();
      $('#editComment').modal('show');
    }
  }

  removeComment(id){
    this.blogsservice.removeComment(id);
    setTimeout(()=>{
      this.ngOnInit();
    },500);
  }
}
