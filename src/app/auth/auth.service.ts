import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";


interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string,
  expiresIn: number,
  localId: string
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
      });
  }

}