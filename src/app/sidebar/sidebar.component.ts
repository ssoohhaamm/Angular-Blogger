import { Component, OnInit } from '@angular/core';
import { BlogsService } from '../../services/blogs.service';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  blogs : any;
	totalRecords : any;
	pageSize = [];
	alldata: any;
	activePage = 1;
	loaded = false;
  constructor(private blogsservice: BlogsService) {
   }

  ngOnInit() {
  	this.blogsservice.get()
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
