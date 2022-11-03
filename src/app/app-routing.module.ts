import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { AppComponent } from './app.component';
import { CourseDetailComponent } from './courses/course-detail/course-detail.component';
import { CoursesComponent } from './courses/courses.component';
import { FallbackComponent } from './fallback/fallback.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PricingComponent } from './pricing/pricing.component';
import { AuthGuard } from './services/auth/auth.guard';
import { TasksComponent } from './tasks/tasks.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'courses', component: CoursesComponent },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard] },
  { path: 'tasks', component: TasksComponent, canActivate: [AuthGuard] },
  {
    path: 'courses/:courseId',
    component: CourseDetailComponent,
    children: [{ path: 'pricing', component: PricingComponent }],
  },
  { path: '**', component: FallbackComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
