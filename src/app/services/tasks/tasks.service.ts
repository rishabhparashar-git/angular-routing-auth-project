import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { take, exhaustMap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class TasksService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  getTasks() {
    return this.http.get(
      'https://angular-project-7010b-default-rtdb.firebaseio.com/tasks.json'
    );
  }
  // this.http.get()
}
