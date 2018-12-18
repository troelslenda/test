import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RoverPhotosService {

  serviceURI: string = "https://api.nasa.gov/mars-photos/api/v1/rovers/ROVER_NAME/photos";
  constructor(private http: HttpClient) { }

  getImages(rover: string, camera: string, page:number=1) {
    console.log('rover', rover, this.serviceURI)
    const params: any = {
       page: page.toString(),
       api_key: environment.nasaApiKey,
       sol: '1000'
     }
    if (camera !== 'all') {
      params.camera = camera;
    }
    return this.http.get(this.serviceURI.replace('ROVER_NAME', rover), {params: params})
    .pipe(
      map(res => 
        {
          return res.photos.map(photo => {
          return {
            camera: photo.camera.full_name,
            earth_date: photo.earth_date,
            rover: photo.rover.name,
            image: photo.img_src
          }}
        )
      })
    )
  }
}
