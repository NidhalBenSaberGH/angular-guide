import {Component, OnInit} from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  FormArray,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
  FormBuilder
} from "@angular/forms";
import {Observable, of} from "rxjs";
import {delay, map} from "rxjs/operators";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  genders = ['male', 'female'];

  signupForm!: FormGroup;
  
  simpleForm!: FormGroup;
  
  forbiddenUserNames = ['Chris', 'Anna'];
  
  constructor(private formBuilder: FormBuilder) {
	  
  }

  ngOnInit() {
    this.signupForm = new FormGroup({
      'userData': new FormGroup({
        'username': new FormControl(null, [Validators.required, this.forbiddenNames.bind(this)]),
        'email': new FormControl(null, [Validators.required, Validators.email], this.emailValidator())
      }),
      'gender': new FormControl('male'),
      'hobbies': new FormArray([])
    });
	
	this.simpleForm = this.formBuilder.group({
	firstName: ['', Validators.required], 
	lastName: ['', Validators.required],
	zip: ['', [Validators.required, Validators.minLength(4), Validators.pattern("^[0-9]*$")]],
	});

    this.signupForm.valueChanges.subscribe(
      (value) => console.log(value)
    );
    this.signupForm.statusChanges.subscribe(
      (status) => console.log(status)
    );

    this.signupForm.setValue({
      'userData': {
        'username': 'Max',
        'email': 'max@test.com'
      },
      'gender': 'male',
      'hobbies': []
    });

    this.signupForm.patchValue({
      'userData': {
        'username': 'Anna',
      }
    });


  }

  onsubmit() {
    console.log(this.signupForm);
  }
  
  onSubmitSimple(): void {
	  console.log(this.simpleForm);
  }

  onAddHobby() {
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.signupForm.get('hobbies')).push(control);
  }

  getControls(controlName: string) {
    return (this.signupForm.get(controlName) as FormArray).controls;
  }

  // @ts-ignore
  forbiddenNames(control: FormControl): { [s: string]: boolean } {
    if (this.forbiddenUserNames.indexOf(control.value) !== -1) {
      return {'nameIsForbidden': true};
    }
    // @ts-ignore
    return null;
  }

  checkIfEmailExists(email: string): Observable<boolean> {
    // normally, this is where you will connect to your backend for validation lookup
    // using http, we simulate an internet connection by delaying it by a second
    return of(email === 'test@test.com').pipe(delay(1500));
  }

  emailValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return this.checkIfEmailExists(control.value).pipe(
        map(res => {
          // if res is true, email exists, return true
          return res ? { emailIsForbidden: true } : null;
          // NB: Return null if there is no error
        })
      );
    };
  }






}
