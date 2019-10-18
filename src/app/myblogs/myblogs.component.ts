import { Component, OnInit } from '@angular/core';
import { BlogsService } from '../../services/blogs.service';
import { ResponseModel } from '../../models/response.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-myblogs',
  templateUrl: './myblogs.component.html',
  styleUrls: ['./myblogs.component.css']
})
export class MyblogsComponent implements OnInit {

blogs : any;
totalRecords : any;
pageSize = [];
alldata: any;
activePage = 1;
loaded = false;
slug = "";
  constructor(private blogsservice: BlogsService,private route: ActivatedRoute) {  	
  	
  	

  }  

  ngOnInit() {
      this.route.queryParams.subscribe(params => {
    this.slug = decodeURI(params["search"]);
    console.log(params);
    });

    setTimeout(()=>{
      this.blogsservice.get()
      .subscribe(data => {
        this.alldata = data["items"];
        this.totalRecords = data["count"];      
        this.pageSize.length = Math.floor(this.totalRecords / 5) + 1;
        setTimeout(()=>{      
          this.changePage(0);        
        },300);
      });
    },300);
    
  }

  changePage(i){
    this.loaded = false;
    var min = i*5 , max = min + 5;
    this.blogs = this.alldata.slice(min, max);
    setTimeout(()=>{
      this.loaded = true;
    },300);
  }

  removeComment(id){
    this.blogsservice.removePost(id);
      setTimeout(()=>{
        this.ngOnInit();
      },500);
  }

}
