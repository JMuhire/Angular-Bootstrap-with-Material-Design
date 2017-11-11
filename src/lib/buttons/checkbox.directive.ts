import {Directive, forwardRef, HostBinding, HostListener, Input, OnInit} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

// TODO: config: activeClass - Class to apply to the checked buttons

export const CHECKBOX_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => ButtonCheckboxDirective),
  multi: true
};

/**
* Add checkbox functionality to any element
*/
@Directive({selector: '[mdbCheckbox]', providers: [CHECKBOX_CONTROL_VALUE_ACCESSOR]})
export class ButtonCheckboxDirective implements ControlValueAccessor, OnInit {
  /** Truthy value, will be set to ngModel */
  @Input() public btnCheckboxTrue: any = true;
  /** Falsy value, will be set to ngModel */
  @Input() public btnCheckboxFalse: any = false;

  @HostBinding('class.active') public state = false;

  protected value: any;
  protected isDisabled: boolean;

  protected onChange: Function;
  protected onTouched: Function;

  // view -> model
  @HostListener('click')
  public onClick(): void {
    if (this.isDisabled) {
      return;
    }

    this.toggle(!this.state);
    this.onChange(this.value);
  }

  public ngOnInit(): void {
    this.toggle(this.trueValue === this.value);
  }

  protected get trueValue(): boolean {
    return typeof this.btnCheckboxTrue !== 'undefined' ? this.btnCheckboxTrue : true;
  }

  protected get falseValue(): boolean {
    return typeof this.btnCheckboxFalse !== 'undefined' ? this.btnCheckboxFalse : false;
  }

  public toggle(state: boolean): void {
    this.state = state;
    this.value = this.state ? this.trueValue : this.falseValue;
  }

  // ControlValueAccessor
  // model -> view
  public writeValue(value: any): void {
    this.state = this.trueValue === value;
    this.value = value ? this.trueValue : this.falseValue;
  }

  public setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}
