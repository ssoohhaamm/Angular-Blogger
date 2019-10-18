import { Component, OnInit } from '@angular/core';
import { MustMatch } from '../../helper/must-match.validator';
import { FormBuilder, FormGroup, ReactiveFormsModule , Validators } from '@angular/forms';
import { BlogsService } from '../../services/blogs.service';
import { CommonService } from '../../services/common.service';
import { Router, UrlSerializer } from "@angular/router";
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-create-blog',
  templateUrl: './create-blog.component.html',
  styleUrls: ['./create-blog.component.css']
})
export class CreateBlogComponent implements OnInit {

	blogForm: FormGroup;
	submittedBlog = false;
  loaded = false;
  userId = "";
  blogDetail: any;
  slug = "";
  isLogged = "false";
  editMode = false;
  postId = "";
  constructor(private formBuilder: FormBuilder,private blogsservice: BlogsService, private router: Router,private  commonService: CommonService,private route: ActivatedRoute,private serializer: UrlSerializer) { }

  ngOnInit() {
    if(this.commonService.userDetails != undefined && this.commonService.userDetails["username"] != "" && this.commonService.userDetails["username"] != null)
    {
      this.userId = this.commonService.userDetails["userId"];
      this.isLogged = this.commonService.userDetails["isLogged"];
    }
  	this.loaded = false;
    this.route.queryParams.subscribe(params => {
    this.slug = params["slug"];      
    });

    setTimeout(()=>{

      this.blogsservice.getDetail(this.slug)
        .subscribe(data => {  
        this.blogDetail = data;
        console.log(this.blogDetail);
         if(this.isLogged == "true")
         {
           this.blogForm.controls["title"].setValue(this.blogDetail["title"]);
           this.blogForm.controls["blogimage"].setValue(this.blogDetail["blogimage"]);
           this.blogForm.controls["tags"].setValue(this.blogDetail["tags"]);
           this.blogForm.controls["content"].setValue(this.blogDetail["content"]);
           this.postId = this.blogDetail["id"];
           this.editMode = true;
         }
         this.loaded = true; 
        });

     

    },300);
    this.blogForm = this.formBuilder.group({
        title: ['', Validators.required],
        blogimage: ['', Validators.required],
        content: ['', Validators.required],
        tags: ['', Validators.required]
    });

    this.loaded = true;
  }

  onSubmit() {
        this.submittedBlog = true;

        // stop here if form is invalid
        if (this.blogForm.invalid) {
            return;
        }

        // display form values on success
        this.loaded = false;
        
        if(this.editMode)
        {
          var blogData = {
          "title": this.blogForm.value["title"],
          "content": this.blogForm.value["content"],
          "tags": this.blogForm.value["tags"],          
          "blogimage": this.blogForm.value["blogimage"]
          }
          this.blogsservice.postEdit(this.postId,blogData);
        }
        else{
          var blogData2 = {
          "createdAt": new Date(),
          "userId": this.commonService.userDetails["userId"],
          "title": this.blogForm.value["title"],
          "content": this.blogForm.value["content"],
          "tags": this.blogForm.value["tags"],          
          "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/rachelreveley/128.jpg",
          "blogimage": this.blogForm.value["blogimage"],
          "likes":0
        }
          this.blogsservice.postblog(blogData2);
        }        
        setTimeout(()=>{
          this.loaded = true;
          const tree = this.router.createUrlTree(["/myblogs"], { queryParams: { search: this.userId } });
          console.log(this.serializer.serialize(tree)); // "/?foo=a&bar=42"
          this.router.navigateByUrl(this.serializer.serialize(tree));
        },300);
    }

    get f() { return this.blogForm.controls; }


}