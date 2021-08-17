import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Recipe} from "./recipe-list/recipe.model";
import {Observable} from "rxjs";
import {DataStorageService} from "../shared/data-storage.service";

@Injectable({providedIn: 'root'})
export class RecipeResolverService implements Resolve<Recipe[]> {

  constructor(private dataStorageService: DataStorageService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Recipe[]> | Promise<Recipe[]> | Recipe[] {
    return this.dataStorageService.fetchRecipes(); // I not subscribe here but resolver will subscribe for me to find out once data is there.
  }

}
