import { emailPattern } from './../../../shared/validators/validators';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import * as customValidators from 'src/app/shared/validators/validators';
import { ValidatorsService } from '../../../shared/service/validators.service';
import { EmailValidatorService } from 'src/app/shared/validators/email-validator.service';
import { of } from 'rxjs';

@Component({
  templateUrl: './register-page.component.html',
  styles: [
  ]
})
export class RegisterPageComponent {

  public myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required,  Validators.pattern(this.validatorsService.firstNameAndLastnamePattern)]],
    // email: ['', [Validators.required, Validators.pattern(this.validatorsService.emailPattern)],[new EmailValidatorService()]],
    email: ['', [Validators.required, Validators.pattern(this.validatorsService.emailPattern)],[this.emailValidatorService]],
    username: ['', [Validators.required, this.validatorsService.cantBeStrider]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    password2: ['', [Validators.required, Validators.minLength(6)]],
  },
  {
    validators: [
      this.validatorsService.isFieldOneEqualFieldTwo('password', 'password2')
    ]
  }
  );

  constructor(
    private fb: FormBuilder,
    private validatorsService: ValidatorsService,
    private emailValidatorService: EmailValidatorService
    ) {}

  isValidField(field: string){
    return this.validatorsService.isValidField(this.myForm, field);
  }

  getFieldMessageError(field: string): string|null{
    if(!this.myForm.controls[field]) return null;

    const errors = this.myForm.controls[field].errors || {}
    for (const key of Object.keys(errors)){
      switch(key){
        case"required":
          return "Este campo es requerido";

        case "emailTaken":
          return "El email ya está registrado"
      }
    }
    return null;
  }

  onSubmit() {
    this.myForm.markAllAsTouched;
    console.log(this.myForm.value)
  }

}
