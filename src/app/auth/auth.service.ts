import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {catchError} from "rxjs/operators";
import {throwError} from "rxjs";


export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string,
  expiresIn: number,
  localId: string,
  // registered?: boolean;
}

@Injectable({providedIn: 'root'})
export class AuthService {

  constructor(private http: HttpClient) {
  }

  signUp(email: string, password: string) {

    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAyuNjsHlBJft8m4aFIk9KNjvNRCR2uMdY',
      {
        email: email,
        password: password,
        returnSecureToken: true
        // @ts-ignore
      }).pipe(catchError(errorRes => {
      let errorMessage = 'An Unknown error occurred!';
      if (!errorRes.error || !errorRes.error.error) {
        return throwError(errorMessage);
      }
      switch (errorRes.error.error.message) {
        case 'EMAIL_EXISTS':
          // @ts-ignore
          errorMessage = 'this email exists already';

      }
      return throwError(errorMessage);
    }));
  }

  login(email: string, password: string) {
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAyuNjsHlBJft8m4aFIk9KNjvNRCR2uMdY',
      {
        email: email,
        password: password,
        returnSecureToken: true
      });
  }

}
