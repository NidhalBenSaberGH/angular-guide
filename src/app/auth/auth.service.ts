import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, tap} from "rxjs/operators";
import {BehaviorSubject, throwError} from "rxjs";
import {User} from "./user.model";


export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string,
  expiresIn: number,
  localId: string,
  registered?: boolean
}

@Injectable({providedIn: 'root'})
export class AuthService {


  // @ts-ignore
  user :BehaviorSubject<User> = new BehaviorSubject<User>(null);

  constructor(private http: HttpClient) {
  }

  signUp(email: string, password: string) {

    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAyuNjsHlBJft8m4aFIk9KNjvNRCR2uMdY',
      {
        email: email,
        password: password,
        returnSecureToken: true
        // @ts-ignore
      }).pipe(catchError(this.handleError),
      tap(
        resData => {
          this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
        }
      )
    );
  }

  login(email: string, password: string) {
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAyuNjsHlBJft8m4aFIk9KNjvNRCR2uMdY',
      {
        email: email,
        password: password,
        returnSecureToken: true
      }).pipe(catchError(this.handleError),
      tap(
        resData => {
          this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
        }
      ));
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An Unknown error occurred!';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'this email exists already';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'this email does not exist';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'Invalid password';
        break;
    }
    return throwError(errorMessage);
  }

  private handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
    const expirationData = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(
      email,
      userId,
      token,
      expirationData
    );

    this.user.next(user);

  }

}
