import {Component, DebugElement} from '@angular/core';
import {ViewChild} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';

import {ButtonCheckboxDirective} from './checkbox.directive';

describe('MDBCheckboxDirective', () => {
  let fixture: ComponentFixture<any>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [ButtonCheckboxDirective, SimpleCheckbox]
      });

      TestBed.compileComponents();
    })
  );

  describe('basic behaviours', () => {
    let checkboxDebugElement: DebugElement;
    let checkboxNativeElement: HTMLInputElement;
    let checkboxInstance: SimpleCheckbox;

    beforeEach(() => {
      fixture = TestBed.createComponent(SimpleCheckbox);
      fixture.detectChanges();

      checkboxDebugElement = fixture.debugElement.query(By.directive(ButtonCheckboxDirective));
      checkboxNativeElement = checkboxDebugElement.nativeElement;
      checkboxInstance = checkboxDebugElement.componentInstance;
    });

    it('should toggle state', () => {
      checkboxInstance.mdbCheckbox.toggle(false);
      fixture.detectChanges();
      expect(checkboxDebugElement.classes.active).toBe(false);
      checkboxInstance.mdbCheckbox.toggle(true);
      fixture.detectChanges();
      expect(checkboxDebugElement.classes.active).toBe(true);
    });
  });
});

@Component({
  template: `<input type="checkbox" mdbCheckbox>`
})
export class SimpleCheckbox {
  @ViewChild(ButtonCheckboxDirective) mdbCheckbox: ButtonCheckboxDirective;
}
