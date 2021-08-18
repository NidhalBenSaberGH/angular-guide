import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {RecipeService} from "../recipes/recipe.service";
import {Recipe} from "../recipes/recipe-list/recipe.model";
import {exhaustMap, map, take, tap} from "rxjs/operators";
import {AuthService} from "../auth/auth.service";
import {User} from "../auth/user.model";

@Injectable({providedIn: 'root'})
export class DataStorageService {

  constructor(private http: HttpClient,
              private recipeService: RecipeService,
              private authService: AuthService
  ) {
  }

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.http.put('https://recipe-book-ac500-default-rtdb.firebaseio.com/recipes.json', recipes)
      .subscribe(response => {
        console.log(response);
      });
  }

  fetchRecipes() {
    // take one value from that observable before get unsubscribe
    // so, it will give me the latest user and unsubscribe
      return this.authService.user.pipe(
        take(1),
        exhaustMap((user: User) => {

          console.log(user);
          console.log(user.token);

          return this.http.get<Recipe[]>(
            'https://recipe-book-ac500-default-rtdb.firebaseio.com/recipes.json'
            // ,{params: new HttpParams().set('auth', user.token)}
          );
        }),
        map(recipes => {
          return recipes.map(recipe => {
            return {
              ...recipe,
              ingredients: recipe.ingredients ? recipe.ingredients : []
            };
          });
        }),
        tap(recipes => {
          this.recipeService.setRecipes(recipes);
        })
      );


  }

}
