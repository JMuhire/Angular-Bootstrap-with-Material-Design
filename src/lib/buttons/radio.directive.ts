import {Directive, ElementRef, forwardRef, HostBinding, HostListener, Input, OnInit} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

export const RADIO_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => ButtonRadioDirective),
  multi: true
};

/**
* Create radio buttons or groups of buttons.
* A value of a selected button is bound to a variable specified via ngModel.
*/
@Directive({selector: '[mdbRadio]', providers: [RADIO_CONTROL_VALUE_ACCESSOR]})
export class ButtonRadioDirective implements ControlValueAccessor, OnInit {
  public onChange: Function;
  public onTouched: Function;

  /** Radio button value, will be set to `ngModel` */
  @Input() public mdbRadio: any;
  /** If `true` — radio button can be unchecked */
  @Input() public uncheckable: boolean;
  /** Current value of radio component or group */
  @Input() public value: any;

  @HostBinding('class.active')
  public get isActive(): boolean {
    return this.mdbRadio === this.value;
  }

  // @HostBinding('class.active')
  @HostListener('click')
  public onClick(): void {
    if (this.el.nativeElement.attributes.disabled) {
      return;
    }

    if (this.uncheckable && this.mdbRadio === this.value) {
      this.value = undefined;
    } else {
      this.value = this.mdbRadio;
    }

    this.onTouched();
    this.onChange(this.value);
  }

  constructor(private el: ElementRef) {}

  public ngOnInit(): void {
    this.uncheckable = typeof this.uncheckable !== 'undefined';
  }

  public onBlur(): void {
    this.onTouched();
  }

  // ControlValueAccessor
  // model -> view
  public writeValue(value: any): void {
    this.value = value;
  }

  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}
