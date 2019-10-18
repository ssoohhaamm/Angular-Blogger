import { Component, OnInit } from '@angular/core';
import { BlogsService } from '../../services/blogs.service';
declare var $: any;


@Component({
  selector: 'app-allblogs',
  templateUrl: './allblogs.component.html',
  styleUrls: ['./allblogs.component.css']
})
export class AllblogsComponent implements OnInit {
blogs : any;
totalRecords : any;
pageSize = [];
alldata: any;
activePage = 1;
loaded = false;
showSidebar = false;
allTags = [];

  constructor(private blogsservice: BlogsService) {  	
  	

  }  

  ngOnInit() {
      this.allTags = [];
      const tmptagsArray = [];
        this.blogsservice.get()
        .subscribe(data => {
          this.alldata = data["items"];
          this.totalRecords = data["count"];
          for (var i = 0; i < this.alldata.length; ++i) {
            var tmp = this.alldata[i]["tags"].split("#");
            for (var j = 0; j < tmp.length; ++j) {
              if(tmp[j] != "#"){
                tmptagsArray.push(tmp[j]);  
              }
              
            }
            
          }
          this.allTags = tmptagsArray.filter((it, i, ar) => ar.indexOf(it) === i);
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

  toggleSearch()
  {
    if(this.showSidebar == false){
      this.showSidebar = true;  
    }
    else{
       this.showSidebar = false; 
    }
    
  }
}
