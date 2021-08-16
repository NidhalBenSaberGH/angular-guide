import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from "rxjs/operators";
import {Post} from "./post.model";
import {PostsService} from "./posts-service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  loadedPosts: Post[] = [];
  isFetching = false;
  error = null;

  private errorSubscription!: Subscription;

  constructor(private http: HttpClient, private postService: PostsService) {
  }

  ngOnInit() {
    this.errorSubscription = this.postService.error.subscribe(errorMessage => {
      // @ts-ignore
      this.error = errorMessage;
    });
    this.isFetching = true;
  }

  onCreatePost(postData: Post) {

    this.postService.createAndStorePost(postData.title, postData.content);
  }

  onFetchPosts() {
    this.isFetching = true;
    this.postService.fetchPosts().subscribe(posts => {
      this.isFetching = false;
      this.loadedPosts = posts;
    },error => {
      this.error = error.message;
    })
  }

  onClearPosts() {
    this.postService.deletePosts().subscribe(() => {
      this.loadedPosts = [];
    })
  }

  ngOnDestroy(): void {
    this.errorSubscription.unsubscribe();
  }
}
