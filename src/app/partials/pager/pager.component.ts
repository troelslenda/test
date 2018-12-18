import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-pager',
  templateUrl: './pager.component.html',
  styleUrls: ['./pager.component.scss']
})
export class PagerComponent implements OnInit, OnChanges {

  @Input('total') total;
  itemsPrPage: number = 25;
  currentPage: number;
  showPager: boolean;

  constructor(private route: ActivatedRoute, private router: Router) {}

  pageChange() {
    // TODO: Should probably emit this value instead and let the parent
    // component be responsible for updating the url.
    this.router.navigate(
      [],
      {
        relativeTo: this.route,
        queryParams: { page: this.currentPage },
        queryParamsHandling: "merge"
      }
    )
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.currentPage = params['page'] || 1;
    })
   
  }
  ngOnChanges() {
    this.showPager = false;
    if (this.total > this.itemsPrPage) {
      this.showPager = true;
    }
  }
}
