import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Router, NavigationStart } from '@angular/router';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { ResponseModel } from '../models/response.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

	url: string = environment.apiUrl;
  	constructor(private apiService: ApiService) {  		
  	}


  	get(): Observable<ResponseModel> {
	    return this.apiService.get('/users/')
	      .pipe(map(data => data));
	  }

    getUsersDetail(userName): Observable<ResponseModel> {
      return this.apiService.get('/users?search='+userName)
        .pipe(map(data => data));
    }

    editProfile(id,data): Observable<ResponseModel> {
      return this.apiService.put('/users/'+id, data);
    }

    removeProfile(id): Observable<ResponseModel> {
      return this.apiService.delete('/users/'+id);
    }

    register(user): Observable<ResponseModel> {
      return this.apiService.post('/users', user);
    }


  	private handleError(error: any): Promise<any> {
        return Promise.reject(error.message || error);
    }
}
