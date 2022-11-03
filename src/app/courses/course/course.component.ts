import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ICourses } from 'src/app/courses';
import { CourseStorageService } from 'src/app/services/course-storage.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css'],
})
export class CourseComponent {
  constructor(
    private courseStorageService: CourseStorageService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  @Input('visitedId') visitedId: number = 0;
  courses: any;
  public errorMsg: any;

  ngOnInit(): void {
    // this.courseStorageService.getCourses().subscribe(
    //   (data) => {
    //     this.courses = data;
    //   },
    //   (error) => {
    //     this.errorMsg = error;
    //   }
    // );

    this.courses = this.courseStorageService.getCourses();
  }

  goTo(id: number) {
    this.router.navigate([`${id}`], { relativeTo: this.route });
  }
}
