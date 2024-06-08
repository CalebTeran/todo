import { AbstractControl, FormControl } from '@angular/forms';

export interface ICheckInputConfig {
  parentFromControl: FormControl | AbstractControl;
  placeholder?: string;
  errorMessage?: string;
  inputType: string;
  sucessMessage: string;
  pattern?: string; 
}
