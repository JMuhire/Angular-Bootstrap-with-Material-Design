import {AfterContentInit, Component, ContentChildren, ElementRef, QueryList} from '@angular/core';
import {RouterLinkWithHref} from '@angular/router';

@Component({
  selector: 'links',
  template: `
        <ng-content></ng-content>
    `
})
export class LinksComponent implements AfterContentInit {
  @ContentChildren(RouterLinkWithHref, {read: ElementRef})
  links: QueryList<ElementRef>;

  ngAfterContentInit() {
    console.log(this.links);
  }
}
