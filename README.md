[![Angular-Bootstrap-with-Material-Design](https://mdbootstrap.com/img/Mockups/MDB-post/angular-about5.jpg)](https://mdbootstrap.com/angular/)

# Angular Bootstrap with Material Design

[![npm version](https://badge.fury.io/js/angular-bootstrap-md.svg)](https://badge.fury.io/js/angular-bootstrap-md)

Built with Angular 5, Bootstrap 4 and TypeScript. CLI version available. Absolutely no jQuery.

400+ material UI elements, 600+ material icons, 74 CSS animations, TypeScript modules, SASS files and many more.

All fully responsive. All compatible with different browsers.

__________

# Demo:  
**Main demo**: https://mdbootstrap.com/angular/components/

# Version:
- Angular CLI 1.5.0
- Angular 5.0

# Quick start
- Clone following repo:  
```javascript
git clone https://github.com/mdbootstrap/Angular-Bootstrap-with-Material-Design.git .
``` 
note "." at the end. It will clone files directly into current folder. 
- Run `npm i`
- Run `npm start`
- Voilà! Open browser and visit http://localhost:4200 

Now you can navigate to our documentation (http://mdbootstrap.com/angular/), pick any component and place within your project.

# How to install MDB via npm:
- create new project `ng new project_name --style=scss`
- `npm i angular-bootstrap-md --save`
- to app.module.ts add
```javascript
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

2/ Add 1 by 1, modules from master branch to src/lib folder like buttons module. After copying, resolve all missing import.

### Important:  

If your module import from npm package, you will have to add it to /build.js at globals and external config 
(see comment for more detail).

Restructure module with public_api.ts and index.ts. For example:

public_api.ts
```ts
export {ButtonsModule} from './buttons.module';
export {ButtonRadioDirective} from './radio.directive';
export {ButtonCheckboxDirective} from './checkbox.directive';
```
<<<<<<< HEAD
- add following into tsconfig.json file located in *root* folder 
```javascript
"include": ["node_modules/angular-bootstrap-md/**/*.ts",  "src/**/*.ts"],
```  

(note: there is also tsconfig.app.json file inside src folder, however if you want to use it, path should be different)
```javascript
"include": [ "**/*.ts", "../node_modules/angular-bootstrap-md/index.ts" ]
```

### Run server
```bash
ng serve --open
=======
index.ts
```ts
export * from './public_api';
>>>>>>> 8ad0fdf758858a362252e6fd9448d78497481596
```

3/ Add an entry to src/lib/public_api.ts like so:

```ts
export * from './buttons';
```

4/ Run `npm run build`

5/ Read error if it occur and try to refactor the code to make it compile. Fire an issue on github if there is something unclear and we will discuss together.