import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { ICourses } from '../courses';
// import 'rxjs/add/operator/catch';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CourseStorageService {
  constructor(private http: HttpClient) {}

  private url: string = 'app/services/courses.json';
  // private url: string =
  //   'https://angular-project-402b3-default-rtdb.firebaseio.com/';

  // getCourses(): Observable<ICourses[]> {
  //   return this.http
  //     .get<ICourses[]>(this.url)
  //     .pipe(catchError(this.errorHandler));
  // }
  private courses = [
    {
      id: 1,
      title: 'Professional Certification In Product Management',
      description:
        "Get professionally certified in Product Management from SP Jain Global & become a part of their global Alumni network. Product Management course involves 4 months of live rigorous training from SP Jain's top faculty across Australia, Dubai, & India, along with live sessions from top product leaders.",
      duration: '4 months',
      image: 'assets/ethicalhacking.jpg',
      pricing: {
        free: [0, 5, 1],
        pro: [15, 10, 5],
        enterprise: [29, 20, 10],
      },
    },
    {
      id: 2,
      title: 'AI for Decision Making',
      description:
        'This AI program with Wharton Online gives you the competitive edge in emerging business technologies. The AI program delivers a foundational understanding of today’s top technologies, including big data, AI, and machine learning, and how you can use them to support your organization’s strategy.',
      duration: '6 Months',
      image: 'assets/businessStrategies.jpg',
      pricing: {
        free: [0, 10, 2],
        pro: [20, 20, 10],
        enterprise: [39, 30, 15],
      },
    },
    {
      id: 3,
      title: 'Professional Certificate Program In Ethical Hacking',
      description:
        " Boost your career as a cybersecurity expert through this PCP in Ethical Hacking and Penetration Testing in collaboration with IIT Kanpur. In 6 months, you'll learn advanced offensive cybersecurity strategies to protect networks and data from breaches, theft, attacks, and more",
      duration: '9 Months',
      image: 'assets/productmanagement.jpg',
      pricing: {
        free: [0, 10, 2],
        pro: [45, 40, 20],
        enterprise: [59, 60, 50],
      },
    },
  ];
  getCourses() {
    return this.courses;
  }

  getCourse(id: number) {
    return this.courses.filter((course) => course.id === id)[0];
  }
  getPricing(id: number) {
    let selectedCourse = this.courses.filter((course) => course.id === id)[0];
    return selectedCourse.pricing;
  }

  getCoursesCount() {
    return this.courses.length;
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(() => error.message || 'Server Error');
  }
}
