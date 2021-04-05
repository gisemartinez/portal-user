import {AbstractControl, FormControl, Validators} from "@angular/forms";

export class SurveyInputBase<T> {
  value: T;
  key: string;
  label: string;
  required: boolean;
  order: number;
  controlType: string;
  id: string;
  control?: AbstractControl

  constructor(options: {
    value?: T,
    key?: string,
    label?: string,
    required?: boolean,
    order?: number,
    controlType?: string
    id?: string
  } = {}, control?: AbstractControl) {
    this.value = options.value;
    this.key = options.key || '';
    this.label = options.label || '';
    this.required = options.required;
    this.order = options.order === undefined ? 1 : options.order;
    this.controlType = options.controlType || '';
    this.id = options.id;
    if (control === undefined) {
      this.control = options.required ? new FormControl(null, Validators.required)
        : new FormControl(null)
    } else {
      this.control = control
    }
  }
}
