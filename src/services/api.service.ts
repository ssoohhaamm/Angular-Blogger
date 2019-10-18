import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClientModule, HttpParams, HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable ,  throwError, Subscription  } from 'rxjs';
import { map } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';

 
@Injectable()
export class ApiService {
  httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
 
  constructor(
    private http: HttpClient
  ) {}

  private formatErrors(error: any) {
    return  throwError(error.error);
  }

  get(path: string,params: HttpParams = new HttpParams()): Observable<any> {        
    return this.http.get(`${environment.apiUrl}${path}`, { params })
      .pipe(catchError(this.formatErrors));
  }


  post(path: string, body: Object = {}): any{
    return this.http.post(environment.apiUrl+path, JSON.stringify(body),this.httpOptions ).subscribe();    
  }

  put(path: string, body: Object = {}): any{
    return this.http.put(environment.apiUrl+path, JSON.stringify(body),this.httpOptions ).subscribe();    
  }

  delete(path: string): any{
    return this.http.delete(environment.apiUrl+path,this.httpOptions ).subscribe();    
  }

}
