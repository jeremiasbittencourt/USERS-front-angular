import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl, ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[appPasswordMatch]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: PasswordMatchDirective,
      multi: true
    }
  ]
})
export class PasswordMatchDirective implements Validator {
  @Input('appPasswordMatch') passwordToCompare: string = '';

  validate(control: AbstractControl): ValidationErrors | null {
    if (control.value !== this.passwordToCompare) {
      return { passwordMismatch: true };
    }
    return null;
  }
}
