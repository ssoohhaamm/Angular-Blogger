import { Component, OnInit } from '@angular/core';
import { BlogsService } from '../../services/blogs.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-filtered',
  templateUrl: './filtered.component.html',
  styleUrls: ['./filtered.component.css']
})
export class FilteredComponent implements OnInit {

blogs : any;
	totalRecords : any;
	pageSize = [];
	alldata: any;
	activePage = 1;
	loaded = false;
	slug = "";

  constructor(private blogsservice: BlogsService, private route: ActivatedRoute) { }

  ngOnInit() {
	this.loaded = false;
  	this.route.queryParams.subscribe(params => {
    this.slug = params["tag"];      
    });

  	this.blogsservice.getUsersPosts(this.slug)
    .subscribe(data => {
      this.alldata = data["items"];
      this.totalRecords = data["count"];      
      this.pageSize.length = Math.floor(this.totalRecords / 5) + 1;
      setTimeout(()=>{      
        this.changePage(0);        
      },300);
    });


  }

  changePage(i){
    this.loaded = false;
    var min = i*5 , max = min + 5;
    this.blogs = this.alldata.slice(min, max);
    setTimeout(()=>{
      this.loaded = true;
    },300);
  }

}
