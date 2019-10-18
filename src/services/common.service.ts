import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClientModule, HttpParams, HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';


import { Observable ,  throwError } from 'rxjs';
import { map } from 'rxjs/operators';

import { catchError } from 'rxjs/operators';

 
@Injectable()
export class CommonService {
  userDetails: any;
  cookieValue: string;

  constructor(private cookieService: CookieService) {
    this.userDetails = {
      "userId":this.get("userId"),
      "username": this.get("username"),
      "isLogged": this.get("isLogged")
    };
  }

  private formatErrors(error: any) {
    return  throwError(error.error);
  }

  set(user: any){    
    this.cookieService.set("userId", user["id"]);
    this.cookieService.set("username", user["username"]);
    this.cookieService.set("isLogged", "true");
    setTimeout(function() {
      window.location.href = "/";
    },300);
  }

  get(arg){
    return decodeURI(this.cookieService.get(arg));
  }

  remove(){
    this.cookieService.deleteAll();
    this.userDetails = [];
    setTimeout(function() {
      window.location.href = "/";
    },300);

  }


}
