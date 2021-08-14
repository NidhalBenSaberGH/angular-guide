import {Component, OnDestroy, OnInit} from '@angular/core';
import {Recipe} from "./recipe.model";
import {RecipeService} from "../recipe.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {

  // @Output() recipeWasSelected = new EventEmitter<Recipe>();


  subscription = new Subscription();
  recipes!: Recipe[];


  constructor(private recipeService: RecipeService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.subscription = this.recipeService.recipesChanged.asObservable()
      .subscribe( (recipes: Recipe[]) => {
        this.recipes = recipes;
      });

    this.recipes = this.recipeService.getRecipes();
  }

  onNewRecipe() {
    this.router.navigate(['new'], {relativeTo: this.route}).then( r => {});
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  // onRecipeSelected(recipe: Recipe) {
  //   this.recipeWasSelected.emit(recipe);
  // }



}
