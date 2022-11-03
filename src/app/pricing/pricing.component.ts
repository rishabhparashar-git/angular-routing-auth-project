import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { CourseStorageService } from '../services/course-storage.service';

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.css'],
})
export class PricingComponent implements OnInit {
  @Input('courseId') courseId: any;
  constructor(
    private courseStorageService: CourseStorageService,
    private route: ActivatedRoute
  ) {}
  private id: number = 0;
  public pricingInfo: any;
  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params: ParamMap) => {
      let retrievedId = params.get('pricingOf');
      this.id = retrievedId ? parseInt(retrievedId) : 0;
      this.pricingInfo = this.courseStorageService.getPricing(this.id);
    });
  }
}
