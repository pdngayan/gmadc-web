import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class MailService {


  private emailUrl = 'http://128.199.119.92:3000/sendmail';

  constructor(private http: HttpClient) {

  }

  send (hero: any): Observable<any> {
    return this.http.post<any>(this.emailUrl, hero, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      
      console.error('An error occurred:', error.error.message);
    } else {
      
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
   
    return throwError(
      'Something bad happened; please try again later.');
  };

  // sendEmail(path: string, body: object = {}): Observable<T> | any {
  //   return this.http.post<T>(path, body, { headers: this.setHeaders() }).pipe(
  //     catchError((err: HttpErrorResponse) => {
  //       this.handleError(err, showErrors);

  //       // return a default fallback value so app can continue
  //       return this.formatErrors(err);
  //     })
  //   );
  // }
}
