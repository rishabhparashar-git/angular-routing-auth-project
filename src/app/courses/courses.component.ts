import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css'],
})
export class CoursesComponent implements OnInit {
  constructor(private route: ActivatedRoute, private router: Router) {}

  public selectedId: number = 0;
  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      let retrievedId = params.get('id');
      this.selectedId = retrievedId ? parseInt(retrievedId) : 0;
    });
  }
}
