# DGI Front end assignment

DGI official front end assignment.

## Solution

Implemented in Angular 7 using Angular CLI as task manager and build tool.

To run it locally `npm i -g @angular/cli` then `npm i` and `ng serve --open`. The site should open in your default browser.

### SCSS
Most styling is done by facilitating bootstrap's components and tweaking bootstraps theme. Besides from that a few Angular components `RoverPhotoComponent` and `SpinnerComponent` are extended with some SCSS files.

### Structure

There's two services. One to get photos and one to get rover manifests. Both services are used in the main component `PhotoListComponent`

More details about the project is descibed on troelslenda.github.io/test