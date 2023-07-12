import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { Component } from '@angular/core';

@Component({
  templateUrl: './dynamic-page.component.html',
  styles: [
  ]
})
export class DynamicPageComponent {
  public myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    favoriteGames: this.fb.array([
      ["Metal Gear", Validators.required],
      ["Death Stranding", Validators.required],

    ])
  });

  public newFavorite: FormControl = new FormControl('', [Validators.required]);

  constructor(private fb: FormBuilder){}


  get favoriteGamesControls(){
    return this.myForm.get("favoriteGames") as FormArray;
  }

  isValidField(field: string):boolean | null {
    return this.myForm.controls[field].errors
    && this.myForm.controls[field].touched;
  }

  isValidFieldInArray(formArray: FormArray, index: number) {
     return formArray.controls[index].errors
         && formArray.controls[index].touched;
  }

  getFieldError(field: string): string | null{
    if(!this.myForm.controls[field] ) return null;

    const errors = this.myForm.controls[field].errors || {};

    for (const key of Object.keys(errors)) {
      switch(key) {
        case "required":
          return "Este campo es requerido";

          case "minlength":
            return `Mínimo ${errors['minlength'].requiredLength} caracteres.`
      }
    }
    return null;
  }

  onAddToFavourites():void{
    if(this.newFavorite.invalid) return;
    const newGame = this.newFavorite.value;

    this.favoriteGamesControls.push(
      this.fb.control(newGame, Validators.required)
    );
    this.newFavorite.reset();
  }

  onDeleteFavorite(index: number): void{
    this.favoriteGamesControls.removeAt(index);
  }

  onSubmit(): void{
    if(this.myForm.invalid){
      this.myForm.markAllAsTouched();
      return;
    }
    console.log(this.myForm.value);
    (this.myForm.controls['favouriteGames'] as FormArray) = this.fb.array([]);
    this.myForm.reset();
    this.newFavorite.reset();
  }
}
