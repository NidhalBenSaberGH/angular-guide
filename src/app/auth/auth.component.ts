import {Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {Observable, Subscription} from "rxjs";
import {AuthResponseData, AuthService} from "./auth.service";
import {Router} from "@angular/router";
import {AlertComponent} from "../shared/alert/alert.component";
import {PlaceholderDirective} from "../shared/placeholder/placeholder.directive";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {

  @ViewChild(PlaceholderDirective) alertHost!: PlaceholderDirective;

  private closeSub!: Subscription;

  isLoginMode = true;
  isLoading = false;
  error: any;

  constructor(private authService: AuthService,
              private router: Router,
              private componentFactoryResolver: ComponentFactoryResolver
              ) {
  }

  ngOnInit() {
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {

    if (!form.valid) {
      return;
    }

    const email = form.value.email;
    const password = form.value.password;

    let authObs: Observable<AuthResponseData>;

    this.isLoading = true;

    if (this.isLoginMode) {
      authObs = this.authService.login(email, password);
      // .subscribe(response => {
      //     console.log(response);
      //     this.isLoading = false;
      //   },
      //   errorMessage => {
      //     console.log(errorMessage);
      //     this.error = errorMessage;
      //     this.isLoading = false;
      //   });
    } else {
      authObs = this.authService.signUp(email, password);
      // .subscribe(response => {
      //     console.log(response);
      //     this.isLoading = false;
      //   },
      //   errorMessage => {
      //     console.log(errorMessage);
      //     this.error = errorMessage;
      //     this.isLoading = false;
      //   });
    }

    // instead of redundant subscribe block we use observable
    authObs.subscribe(response => {
        console.log(response);
        this.isLoading = false;

        this.router.navigate(['/recipes']);
      },
      errorMessage => {
        console.log(errorMessage);
        this.error = errorMessage;

        this.showErrorAlert(errorMessage);

        this.isLoading = false;
      });

    form.reset();
    this.error = null;
  }

  onHandleError() {
    this.error = null;
  }

  private showErrorAlert(errorMessage: string) {
   // dynamic component create with components factory

    const alertCmpFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);

    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();

    const componentRef = hostViewContainerRef.createComponent(alertCmpFactory);

    componentRef.instance.message = errorMessage;

    this.closeSub = componentRef.instance.close.subscribe( () => {
      this.closeSub.unsubscribe();
      hostViewContainerRef.clear();
    })

  }

  ngOnDestroy(): void {

    if (this.closeSub) {
      this.closeSub.unsubscribe();
    }
  }

}
