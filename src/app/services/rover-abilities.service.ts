import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RoverAbilitiesService {

  serviceURI: string = "https://api.nasa.gov/mars-photos/api/v1/manifests/ROVER_NAME";
  constructor(private http: HttpClient) { }

  getRoverData(rover: string) {
    return this.http.get(this.serviceURI.replace('ROVER_NAME', rover), {
      params: {
        api_key: environment.nasaApiKey
      }
    })
  }
}
