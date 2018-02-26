# DGI Front end assignment

DGI official front end assignment.

#### Table of contents
* [1. Frontend assignment](#1-frontend-assignment-instructions)
* [2. Frontend assignment structure](#2-frontend-assignment-structure)
* [3. Installation](#3-installation)
* [4. Building & compiling](#4-building--compiling)
* [5. Scss file structure](#5-scss-file-structure)
* [6. Working with javascripts](#6-working-with-javascripts)

## 1. Frontend assignment instructions
In this assignment we would like you to show us your work with HTML, styling and javascript.
Follow the instructions below, you can spend as much time as you want on the assignment, but probably you need to spend atleast a few hours.

We need you to build a small widget, listing images from Nasa Mars Rover photos:
https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=DEMO_KEY

The data should be presented as a list. 
Each list element should contain an image, rover name, camera name and earthdate.

Possible extensions:
- Add possibility to filter list by rover or camera

We have placed a static version of the response in docs/data/nasa.json
```zsh
├── docs/                   
│   ├── data/               # nasa.json
```

The assignment should demonstrate how you work with HTML markup in the index.html, we have implemented Bootstrap (v.4.0.0) in this assignment
```zsh
├── docs/                   # index.html
```

We encourage you to use sass, create partials and include them in main.scss, we have setup a demo.scss in partials folder you can do your work in that or create your own structure. Be aware that you can just use normal css syntax in a _partial.scss, and notice that we prefix partial files with an underscore.
```zsh
├── scss/
│   ├── partials/           # project partials, such as modules or sections
│   └── ...
```

We encourage you to use a clientside framework like Angular or Vue to handle the functionality of the widget, otherwise just do it how you feel is best.
if you dont have a preferred build setup for Angular Vue or the like, we encourage you to build custom partials jquery files and then initialize them in main.js, we have created a _demo.js app and initialized it in main.js.
```zsh
├── js/
│   ├── partials/           # custom partials
│   └── ...
```

## 2. Frontend assignment structure

```zsh
.
├── build/                  # output folder for gulp tasks
│   ├── assets/
│   │   ├── images/
│   │   │   └── favicons/   # generated favicon destination
│   │   ├── javascripts/
│   │   │   └── lib/        # external js libraries not included in the js build
│   │   ├── stylesheets/
│   ├── data/               # build folder for static (*.json) 
│   └── *.html              # index.html and other built .html
├── docs/                   # static html
│   ├── data/               # (*.json)  static json
├── gulp/                   # all gulp tasks are added as .js files here
├── images/                 # all static image assets
├── js/
│   ├── partials/           # custom partials
│   ├── vendor/             # all external scripts
│   └── ...
├── scss/
│   ├── base/               # base styling, such as typography
│   ├── components/         # smaller components, e.g. buttons or custom lists
│   ├── partials/           # project partials, such as modules or sections
│   ├── vendor/             # plugin style partials, e.g. sliders
│   └── ...
├── .babelrc                # settings for babel (js compilation)
├── .editorconfig           # sublime editor settings
├── .eslintrc               # settings for ES6 linting
├── .gitignore
├── .jshintignore           # files/folders to ignore in js hinting
├── .jshintrc               # settings for jshint
├── .scss-lint.yml          # settings for scss lint
├── gulpfile.js             # general gulp files (tasks are imported from /gulp)
├── package.json
└── README.md
```

## 3. Installation
Create a fork of this GitHub repository, then go to your account and your fork of this repo, Git Clone the fork to your machine.

In terminal/command prompt, go to the project folder

```zsh
cd [This Repo]
```

#### 3.1 Install Node.js
If you don't have Node.js installed, get it here: https://nodejs.org/download/

#### 3.2 Install gulp

```zsh
sudo npm install gulp -g
```

#### 3.3 Install Ruby
Install Ruby : https://rubyinstaller.org/downloads/
(use version 2.4.3-1)

#### 3.4 Install scss lint gem

The `scss_lint gem` as per the `gulp-scss-lint` requirements

```zsh
sudo gem install scss_lint
```

#### 3.5 Install node modules
```zsh
npm install
```

## 4. Building & compiling

Main gulp tasks are listed below. For further options, see gulp scripts in `gulp/*.js`

#### 4.1 Development tasks:

Build for development (no compression, includes source maps)
```zsh
gulp build:dev
```

Build/watch assets and start browser sync during development
```zsh
gulp serve:dev
```

Watch assets for updates (no local server)
```zsh
gulp watch:dev
```

#### 4.2 Production tasks:

Build for production (minify assets)
```zsh
gulp build
```

Build/watch assets and start browser sync
```zsh
gulp serve
```

Watch assets for updates (no local server)
```zsh
gulp watch
```

## 5. Scss file structure
```zsh
scss
├── base/                         # base styling, such as typography
├── components/                   # smaller components, e.g. buttons or custom lists
├── partials/                     # project partials, such as modules or sections
├── util/                         # mixins and functions
├── _bootstrap-overrides.scss     # general bootstrap style overrides
├── _bootstrap-variables.scss     # bootstrap variable overrides
├── _bootstrap.scss               # importing bootstrap framework partials
├── main.scss                     # main stylesheet
```

#### 5.1 Compilation with Gulp

The gulp tasks for scss compilation can be found here
```zsh
gulp/
└── styles.js
```

## 6. Working with javascripts
All custom development should be done with closures. This way we avoid polluting the global scope with variables, and we also avoid name conflics in variabels and functions.

#### 6.1 Gulp and the ES5 scripts

The gulp tasks for javascript compilation can be found here
```zsh
gulp/
└── scripts.js
```

To change the files or order, you can change the `PATHS` variable
```zsh
var PATHS = [
  'js/vendor/modernizr-custom.js',
  'js/main.js'
];
```

The following gulp tasks are available for ES5 scripts

```zsh
gulp scripts            # build for production
gulp scripts:dev        # build for development
```
