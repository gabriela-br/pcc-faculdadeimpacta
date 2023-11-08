import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl, ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[appTimeRange]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: TimeRangeDirective,
      multi: true
    }
  ]
})
export class TimeRangeDirective implements Validator, OnInit {
  @Input('appTimeRange') appTimeRange: string;

  constructor(private el: ElementRef) {}

  ngOnInit() {
    this.el.nativeElement.addEventListener('change', () => this.validate(null));
  }

  validate(control: AbstractControl): ValidationErrors | null {
    if (control && control.value) { 
      const selectedTime = new Date(control.value).getHours();
      if (selectedTime < 8 || selectedTime >= 19) {
        return { timeRangeError: true };
      }
    }
    return null;
  }
}
