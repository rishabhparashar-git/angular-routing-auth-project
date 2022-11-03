import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { throwError, Subject, BehaviorSubject } from 'rxjs';
import { User } from './user.model';
import { Router } from '@angular/router';

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // user = new Subject<User>;
  user = new BehaviorSubject<any>(null); // allows to subscribe as well as take the previous snapshot
  token = null;
  private tokenExpirationTimer: any;

  constructor(private http: HttpClient, private router: Router) {}

  private apiKey = 'AIzaSyDpO7wBspFXCzGd57OyGUm-b-C2K4OMmao';

  signup(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.apiKey}`,
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError(this.handleError),
        tap((responseData) =>
          this.handleAuthentication(
            responseData.email,
            responseData.localId,
            responseData.idToken,
            +responseData.expiresIn
          )
        )
      );
  }

  login(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.apiKey}`,
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError(this.handleError),
        tap((responseData) => {
          return this.handleAuthentication(
            responseData.email,
            responseData.localId,
            responseData.idToken,
            +responseData.expiresIn
          );
        })
      );
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['./login']);
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  autoLogin() {
    const localUserInfo = localStorage.getItem('userData');
    if (localUserInfo) {
      const localUserData = JSON.parse(localUserInfo);

      const loadedUser = new User(
        localUserData.email,
        localUserData.id,
        localUserData._token,
        new Date(localUserData._tokenExpirationDate)
      );
      if (loadedUser.token) {
        this.user.next(loadedUser);
        const expirationDuration =
          new Date(localUserData._tokenExpirationDate).getTime() -
          new Date().getTime();
        this.autoLogout(expirationDuration);
      }
    }
  }

  private handleAuthentication(
    email: string,
    userId: string,
    token: string,
    expiresIn: number
  ) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, userId, token, expirationDate);
    this.user.next(user);
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  private handleError(errorResponse: any) {
    let errorMessage: string = 'Unknown Error Occurred';
    if (errorResponse.error && errorResponse.error.error) {
      switch (errorResponse.error.error.message) {
        case 'EMAIL_NOT_FOUND':
          errorMessage =
            'There is no user record corresponding to this identifier. The user may have been deleted.';
          break;
        case 'INVALID_PASSWORD':
          errorMessage =
            'The password is invalid or the user does not have a password.';
          break;
        case 'USER_DISABLED':
          errorMessage =
            ' The user account has been disabled by an administrator.';
          break;
        case 'EMAIL_EXISTS':
          errorMessage =
            'The email address is already in use by another account.';
          break;
        case 'TOO_MANY_ATTEMPTS_TRY_LATER':
          errorMessage =
            'We have blocked all requests from this device due to unusual activity. Try again later.';
          break;
        case 'OPERATION_NOT_ALLOWED':
          errorMessage = 'Password sign-in is disabled for this project.';
          break;
        default:
          errorMessage = 'An Error Occured';
      }
    }
    return throwError(() => new Error(errorMessage));
  }
}
