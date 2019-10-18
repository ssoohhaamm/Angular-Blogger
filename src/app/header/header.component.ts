import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../services/common.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLogged = false;
  user: any;
  userId: any;
  constructor(private _location: Location,private  commonService: CommonService) {   	
  }

  ngOnInit() {
  	if(this.commonService.userDetails != undefined && this.commonService.userDetails["username"] != "" && this.commonService.userDetails["username"] != null)
  	{
  		this.isLogged = this.commonService.userDetails["isLogged"];
  		this.user = this.commonService.userDetails["username"];
      this.userId = this.commonService.userDetails["userId"];
  	}
  }

  logOut(){
    this.commonService.remove();
  }

  backClicked() {
      this._location.back();
    }
}
