import {
  Component,
  OnInit,
  ComponentFactoryResolver,
  ViewChild,
  OnDestroy,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService, AuthResponseData } from '../services/auth/auth.service';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';

import { AlertComponent } from '../alert/alert.component';
import { PlaceholderDirective } from '../directives/placeholder.directive';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnDestroy {
  constructor(
    private authService: AuthService,
    private router: Router,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {}

  private closeSubscription: Subscription;

  displayLogin: boolean = true;
  @ViewChild(PlaceholderDirective, { static: false })
  alertHost: PlaceholderDirective;

  switchMode() {
    this.displayLogin = !this.displayLogin;
  }

  public isLoading: boolean = false;
  public error: string = '';

  onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;
    let authObs: Observable<AuthResponseData>;

    this.isLoading = true;
    if (this.displayLogin) {
      authObs = this.authService.login(email, password);
    } else {
      authObs = this.authService.signup(email, password);
    }

    authObs.subscribe(
      (responseData) => {
        console.log(responseData);
        this.isLoading = false;
        this.router.navigate(['/admin']);
      },
      (errorMessage) => {
        this.error = errorMessage;
        this.showErrorAlert(errorMessage);
        this.isLoading = false;
      }
    );
    form.reset();
  }

  closeHandler() {
    this.error = '';
  }

  private showErrorAlert(message: string) {
    const alertCmpFactory =
      this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
    const hostViewContainerRef = this.alertHost.viewContainerRef;
    //here we are using the hostViewContainerRef to manipulate DOM
    hostViewContainerRef.clear();
    //Now we are creating a new component in the dom
    //to create components like this in angular version lower than 9, you need to
    //add the component in entryComponents in app.modules.ts @ngModules decorator
    // stored in componentRef to access the input and output properties
    const componentRef = hostViewContainerRef.createComponent(alertCmpFactory);

    componentRef.instance.message = message;
    this.closeSubscription = componentRef.instance.close.subscribe(() => {
      this.closeSubscription.unsubscribe();
      hostViewContainerRef.clear();
    });
  }
  ngOnDestroy(): void {
    if (this.closeSubscription) {
      this.closeSubscription.unsubscribe();
    }
  }
}
