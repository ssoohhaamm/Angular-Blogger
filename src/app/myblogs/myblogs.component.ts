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
    });

    setTimeout(()=>{
      this.blogsservice.get()
      .subscribe(data => {
        this.alldata = data["items"];
        this.totalRecords = data["count"];      
        this.loaded = true;   
      });
    },300);
    
  }

  

  removeComment(id){
    this.blogsservice.removePost(id);
      setTimeout(()=>{
        this.ngOnInit();
      },500);
  }

}
