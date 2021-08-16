import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from "rxjs/operators";
import {Post} from "./post.model";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts = [];

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.onFetchPosts();
  }

  onCreatePost(postData: Post) {

    this.http
      .post<{name: string}>(
        'https://angular-guide-17a98-default-rtdb.firebaseio.com/' + 'posts.json',
        postData
      )
      .subscribe(responseData => {
        console.log(responseData);
      });
  }

  private onFetchPosts() {

    this.http.get<{[key: string]:Post}>('https://angular-guide-17a98-default-rtdb.firebaseio.com/' + 'posts.json')
      .pipe(
        map(responseData => {
          const postsArray = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              // @ts-ignore
              postsArray.push({ ...responseData[key], id: key });
            }
          }
          return postsArray;
        })
      )
      .subscribe(posts => {
        // ...
        console.log(posts);
      });

  }

  onClearPosts() {
    // Send Http request
  }
}
