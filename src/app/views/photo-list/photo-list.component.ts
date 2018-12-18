import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RoverPhotosService } from 'src/app/services/rover-photos.service';
import { RoverAbilitiesService } from 'src/app/services/rover-abilities.service';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-photo-list',
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.scss']
})
export class PhotoListComponent implements OnInit {

  photos: any;
  roverData: any;
  isLoading: boolean = true;
  cameras = [];
  selectedRover: string;
  numberOfPhotos: number;

  constructor(private photoservice: RoverPhotosService,private roverdata: RoverAbilitiesService, private router: ActivatedRoute) {
    
    const sol = 1000;

    const routeObserverables = combineLatest(this.router.params, this.router.queryParams, (params, queryparams) => ({ params, queryparams}));

    routeObserverables.subscribe(allparams => {
      console.log('allParams', allparams)
      this.selectedRover = allparams.params['id']
      this.isLoading = true;
      this.roverData = this.roverdata.getRoverData(this.selectedRover)
      this.roverData.subscribe(res => {
        const solMeta = res.photo_manifest.photos.filter(res => res.sol === sol)
        this.cameras = solMeta[0].cameras;
        this.numberOfPhotos = solMeta[0].total_photos;
      })
      let camera = allparams.params['camera'] || 'all'
      let page = allparams.queryparams.page || 1;
      console.log(page)
  
      this.photos = this.photoservice.getImages(this.selectedRover, camera, page)
      this.photos.subscribe(res => this.isLoading = false);
    });


    this.router.params.subscribe(params => {
      
    })
  }


  ngOnInit() {
  }

}
