import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-rover-photo',
  templateUrl: './rover-photo.component.html',
  styleUrls: ['./rover-photo.component.scss']
})
export class RoverPhotoComponent implements OnInit {

@Input('photo') photo;

  constructor() { }

  ngOnInit() {
  }

}
