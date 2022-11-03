import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { IntroComponent } from './intro/intro.component';
import { CoursesComponent } from './courses/courses.component';
import { FooterComponent } from './footer/footer.component';
import { CourseComponent } from './courses/course/course.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { CourseStorageService } from './services/course-storage.service';
import { FallbackComponent } from './fallback/fallback.component';
import { CourseDetailComponent } from './courses/course-detail/course-detail.component';
import { PricingComponent } from './pricing/pricing.component';
import { AdminComponent } from './admin/admin.component';
import { AuthService } from './services/auth/auth.service';
import { TasksService } from './services/tasks/tasks.service';
import { FormsModule } from '@angular/forms';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { TasksComponent } from './tasks/tasks.component';
import { AuthInterceptorService } from './services/auth/auth-iterceptor.service';
import { AlertComponent } from './alert/alert.component';
import { PlaceholderDirective } from './directives/placeholder.directive';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    IntroComponent,
    CoursesComponent,
    FooterComponent,
    CourseComponent,
    LoginComponent,
    HomeComponent,
    FallbackComponent,
    CourseDetailComponent,
    PricingComponent,
    AdminComponent,
    LoadingSpinnerComponent,
    TasksComponent,
    AlertComponent,
    PlaceholderDirective,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [
    CourseStorageService,
    AuthService,
    TasksService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
  //entry components are the components which are eventually to be added programatically
  //no need to add entry components in angular v9+, like here it can be ignored completely
  entryComponents: [AlertComponent],
})
export class AppModule {}
