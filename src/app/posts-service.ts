import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Post} from "./post.model";
import {catchError, map} from "rxjs/operators";
import {Subject, throwError} from "rxjs";


@Injectable({providedIn: 'root'})
export class PostsService {

  error = new Subject();

  constructor(private http: HttpClient) {
  }

  createAndStorePost(title: string, content: string) {
    const postData: Post = {title: title, content: content};
    this.http
      .post<{ name: string }>(
        'https://angular-guide-17a98-default-rtdb.firebaseio.com/' + 'posts.json', postData
      ).subscribe(
      responseData => {
        console.log(responseData);
      }, error => {
        this.error = error.message;
      });
  }

  fetchPosts() {
    return this.http.get<{ [key: string]: Post }>('https://angular-guide-17a98-default-rtdb.firebaseio.com/' + 'posts.json')
      .pipe(
        map(responseData => {
          const postsArray = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              // @ts-ignore
              postsArray.push({...responseData[key], id: key});
            }
          }
          return postsArray;
        }),
        catchError(errorResponse => {

          // some logic here to handle that error
          return throwError(errorResponse);
        })
      );

  }

  deletePosts() {
    return this.http.delete('https://angular-guide-17a98-default-rtdb.firebaseio.com/' + 'posts.json');
  }


}
