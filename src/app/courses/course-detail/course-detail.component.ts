import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ICourses } from 'src/app/courses';
import { CourseStorageService } from 'src/app/services/course-storage.service';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.css'],
})
export class CourseDetailComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private courseFetcher: CourseStorageService,
    private router: Router
  ) {}
  // private course: ICourses[];
  course: any;
  id: number = 0;
  totalCourses: number = 0;
  ngOnInit(): void {
    // Snapshot Method
    // let retrievedId = this.route.snapshot.paramMap.get('courseId');
    // this.id = retrievedId !== null ? parseInt(retrievedId) : 0;

    //Observable Method
    this.route.paramMap.subscribe((params: ParamMap) => {
      let retrievedId = params.get('courseId');
      this.id = retrievedId ? parseInt(retrievedId) : 0;
      this.course = this.courseFetcher.getCourse(this.id);
    });

    this.totalCourses = this.courseFetcher.getCoursesCount();
  }

  goPrevious() {
    let previousId = this.id - 1;

    //navigating to absolute path
    // this.router.navigate(['courses', previousId]);

    //navigating to relative path
    this.router.navigate(['../', previousId], { relativeTo: this.route });
  }

  goNext() {
    let nextId = this.id + 1;
    // this.router.navigate(['courses', nextId]);
    this.router.navigate(['../', nextId], { relativeTo: this.route });
  }

  goCourses() {
    let selectedId = this.id ? this.id : null;
    // this.router.navigate(['courses', { id: selectedId }]);
    this.router.navigate(['../', { id: selectedId }], {
      relativeTo: this.route,
    });
  }

  showPricing(id: number) {
    this.router.navigate(['pricing'], {
      queryParams: { pricingOf: id },
      relativeTo: this.route,
    });
  }
}
