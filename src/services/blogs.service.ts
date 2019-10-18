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
export class BlogsService {

	url: string = environment.apiUrl;
  	constructor(private apiService: ApiService) {  		
  	}


  	get(): Observable<ResponseModel> {
	    return this.apiService.get('/posts?sortBy=id&order=desc')
	      .pipe(map(data => data));
	  }

    getUsersPosts(userName): Observable<ResponseModel> {
      return this.apiService.get('/posts?search='+userName)
        .pipe(map(data => data));
    }

    postblog(user): Observable<ResponseModel> {
      return this.apiService.post('/posts', user);
    }

    postEdit(title,data): Observable<ResponseModel> {
      return this.apiService.put('/posts/'+title, data);
    }

    postLike(user,data): Observable<ResponseModel> {
      return this.apiService.put('/posts/'+user, data);
    }    

    getComment(postid): Observable<ResponseModel> {
      return this.apiService.get('/comments?search='+postid);
    }

    editComment(comment,data): Observable<ResponseModel> {
      return this.apiService.put('/comments/'+comment, data);
    }

    removePost(id): Observable<ResponseModel> {
      return this.apiService.delete('/posts/'+id);
    }
    
    removeComment(comment): Observable<ResponseModel> {
      return this.apiService.delete('/comments/'+comment);
    }
    
    postComment(comment): Observable<ResponseModel> {
      return this.apiService.post('/comments', comment);
    } 

    getDetail(slug): Observable<ResponseModel> {      
    return this.apiService.get('/posts/' + slug)
        .pipe(map(data => data));
    }

  	private handleError(error: any): Promise<any> {
        return Promise.reject(error.message || error);
    }
}
