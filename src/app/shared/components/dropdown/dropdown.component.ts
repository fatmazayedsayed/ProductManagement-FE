import {
  Component,
  Input,
  Output,
  EventEmitter,
  forwardRef,
  OnChanges,
} from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  NG_VALIDATORS,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DropdownComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => DropdownComponent),
      multi: true,
    },
  ],
})
export class DropdownComponent implements ControlValueAccessor, OnChanges {
  @Input() options: any[] = [];
  @Input() placeHolder: string = 'Select';
  @Input() optionValue: string = 'id';
  @Input() optionLabel: string = 'name';
  @Input() isShowClear: boolean = true;
  @Input() disabled: boolean = false;
  @Input() label?: string;

  @Output() selectionChange = new EventEmitter<any>();

  value: any;

  ngOnChanges(changes: any): void {
    if (changes.disabled?.currentValue) {
      this.disabled = changes.disabled.currentValue;
    }
  }
  onChange = (value: any) => {
    console.log(value);
  };
  onTouched = () => {};

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  // setDisabledState?(isDisabled: boolean): void {
  //   this.disabled = isDisabled;
  // }

  validate(control: AbstractControl): ValidationErrors | null {
    return null;
  }

  onSelectionChange(event: any): void {
    this.value = event.value;
    this.onChange(event.value);
    this.onTouched();

    if (!event.value || event.value.length === 0) {
      this.selectionChange.emit(null);
    } else {
      this.selectionChange.emit(event.value);
    }
  }
  onClear(): void {
    this.value = null;
    this.onChange(null);
    this.onTouched();
    this.selectionChange.emit(null);
  }
}
