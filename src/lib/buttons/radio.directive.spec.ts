import {By} from '@angular/platform-browser';
import {Component, DebugElement, ElementRef, ViewChild} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {ButtonRadioDirective} from './radio.directive';
import {FormsModule, ReactiveFormsModule, NgForm} from '@angular/forms';
import {CommonModule} from '@angular/common';

describe('ButtonRadioDirective', () => {
  let fixture: ComponentFixture<any>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [ButtonRadioDirective, RadioButtonWithNgModel],
        imports: [FormsModule, ReactiveFormsModule]
      });

      TestBed.compileComponents();
    })
  );

  describe('basic behaviours', () => {
    let checkboxDebugElement: DebugElement;
    let checkboxNativeElement: HTMLInputElement;
    let checkboxInstance: RadioButtonWithNgModel;

    beforeEach(() => {
      fixture = TestBed.createComponent(RadioButtonWithNgModel);
      fixture.detectChanges();

      checkboxDebugElement = fixture.debugElement.query(By.directive(ButtonRadioDirective));
      checkboxNativeElement = checkboxDebugElement.nativeElement;
      checkboxInstance = checkboxDebugElement.componentInstance;
    });

    it('should create onChange and onTouched funtion', () => {
      expect(checkboxInstance.mdbRadio.onChange).toBeTruthy();
      expect(checkboxInstance.mdbRadio.onTouched).toBeTruthy();
    });
  });
});

@Component({
  template: `
      <form>
          <input type="radio" name="test" ngModel mdbRadio>
      </form>
  `
})
export class RadioButtonWithNgModel {
  @ViewChild(ButtonRadioDirective) mdbRadio: ButtonRadioDirective;
}
