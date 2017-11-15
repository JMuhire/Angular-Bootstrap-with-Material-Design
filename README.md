# This branch is the use to compile mdb to javascript. This is under development. Don't use it yet. 

[![Angular-Bootstrap-with-Material-Design](https://mdbootstrap.com/img/Mockups/MDB-post/angular-about.jpg)](https://mdbootstrap.com/angular/)

# Angular Bootstrap with Material Design

## Contribute Guide

1/ Clone the repo with build-dev branch

`git clone https://github.com/mdbootstrap/Angular-Bootstrap-with-Material-Design.git#build-dev`

2/ Add 1 by 1, modules from master branch to src/lib folder like buttons module. After copying, resolve all missing import.

Restructure module with public_api.ts and index.ts. For example:

public_api.ts
```ts
export {ButtonsModule} from './buttons.module';
export {ButtonRadioDirective} from './radio.directive';
export {ButtonCheckboxDirective} from './checkbox.directive';
```
index.ts
```ts
export * from './public_api';
```

3/ Add an entry to src/lib/public_api.ts like so:

```ts
export * from './buttons';
```

4/ Run `npm run build`

5/ Read error if it occur and try to refactor the code to make it compile. Fire an issue on github if there is something unclear and we will discuss together.