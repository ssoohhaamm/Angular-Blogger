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
export class CommentsService {

  url: string = environment.apiUrl;
    constructor(private apiService: ApiService) {      
    }


    get(id): Observable<ResponseModel> {
      return this.apiService.get('/comments/:'+id)
        .pipe(map(data => data));
    }

    private handleError(error: any): Promise<any> {
        return Promise.reject(error.message || error);
    }
}
