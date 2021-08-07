import {Ingredient} from "../shared/ingredient.model";
import {Subject} from "rxjs";

export class ShoppingListService {

  // ingredientsChanged = new EventEmitter<Ingredient[]>(); // emit our ingredients array
  ingredientsChanged = new Subject<Ingredient>();


  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10)
  ];

  getIngredients() {
    return this.ingredients.slice();
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    //this.ingredientsChanged.emit(this.ingredients.slice()); // pass here a copy of our ingredients array
    // @ts-ignore
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  addIngredients(ingredients: Ingredient[]) {

    // ingredients.forEach(ingredient => {
    //   this.addIngredient(ingredient);
    // });

    this.ingredients.push(...ingredients);
    // this.ingredientsChanged.emit(this.ingredients.slice());
    // @ts-ignore
    this.ingredientsChanged.next(this.ingredients.slice());
  }

}
